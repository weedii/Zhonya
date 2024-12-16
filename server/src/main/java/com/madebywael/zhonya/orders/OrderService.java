package com.madebywael.zhonya.orders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.madebywael.zhonya.admin.AdminMapper;
import com.madebywael.zhonya.admin.DTO.GetAllOrdersResponse;
import com.madebywael.zhonya.common.PageResponse;
import com.madebywael.zhonya.exception_handler.InsufficientStockException;
import com.madebywael.zhonya.user.User;
import com.madebywael.zhonya.user.UserRepository;
import com.madebywael.zhonya.watch.Watch;
import com.madebywael.zhonya.watch.WatchRepository;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

        @Value("${application.payment.stripe.secret-key}")
        private String stripeSecretKey;
        @Value("${application.payment.stripe.endpoint-secret}")
        private String endpointSecret;

        private final WatchRepository watchRepository;
        private final OrderRepository orderRepository;
        private final UserRepository userRepository;
        private final AdminMapper adminMapper;

        // Create payment session
        public OrderResponse createPaymentSession(OrderRequest productRequest) {

                Stripe.apiKey = stripeSecretKey;

                List<SessionCreateParams.LineItem> params = new ArrayList<>();

                for (OrderItemRequest item : productRequest.getItems()) {

                        // set product data
                        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData
                                        .builder()
                                        .setName(item.getBrand() + " " + item.getModel())
                                        .addImage(item.getPictureUrl())
                                        .build();

                        // set product price
                        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData
                                        .builder()
                                        .setCurrency("USD")
                                        .setUnitAmount(item.getPrice() * 100)
                                        .setProductData(productData)
                                        .build();

                        // set product quantity
                        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem
                                        .builder()
                                        .setQuantity(item.getQuantity())
                                        .setPriceData(priceData)
                                        .build();

                        params.add(lineItem);

                }

                String orderItemsString = new Gson().toJson(productRequest.getItems());

                SessionCreateParams sessionParams = SessionCreateParams.builder()
                                .setMode(SessionCreateParams.Mode.PAYMENT)
                                .setSuccessUrl("http://localhost:3000/payment/success")
                                .setCancelUrl("http://localhost:3000/payment/fail")
                                .addAllLineItem(params)
                                .putMetadata("orderItems", orderItemsString)
                                .build();

                Session session = null;
                try {
                        session = Session.create(sessionParams);
                } catch (StripeException e) {
                        System.out.println(e.getMessage());
                }

                return OrderResponse.builder()
                                .status(HttpStatus.OK)
                                .message("Payment session created successfully")
                                .sessionId(session.getId())
                                .sessionUrl(session.getUrl())
                                .build();
        }

        // Place order
        public OrderResponse placeOrder(OrderRequest request) {

                // Check watch existance & stock availability
                for (OrderItemRequest item : request.getItems()) {
                        // Get the watch by id to check stock
                        Watch watch = watchRepository.findById(item.getReference())
                                        .orElseThrow(() -> new EntityNotFoundException(
                                                        "No watch found with the ID: " + item.getReference()));

                        // Check the stock
                        if (watch.getQuantity() < item.getQuantity()) {
                                throw new InsufficientStockException(
                                                "Insufficient stock for: " + item.getBrand() + " "
                                                                + item.getModel()
                                                                + " max is " + watch.getQuantity());
                        }
                }

                // create stripe session for payment
                return createPaymentSession(request);
        }

        // Webhook to check successfull payment & save order
        public void webhook(String sigHeader, String payload) {
                try {
                        Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
                        processEvent(event);
                } catch (SignatureVerificationException e) {
                        System.out.println("Invalid Signature");
                }
        }

        // Webhook process event
        private void processEvent(Event event) {
                if ("checkout.session.completed".equals(event.getType())) {
                        // Extract the raw JSON from the event
                        JsonObject rawObject = JsonParser.parseString(event.toJson())
                                        .getAsJsonObject()
                                        .getAsJsonObject("data")
                                        .getAsJsonObject("object");

                        // Convert raw JSON to a Session object
                        Session session = ApiResource.GSON.fromJson(rawObject.toString(), Session.class);

                        OrderItemRequest[] orderItemsArray = new Gson().fromJson(
                                        session.getMetadata().get("orderItems"),
                                        OrderItemRequest[].class);

                        List<OrderItemRequest> orderItems = Arrays.asList(orderItemsArray);

                        // Save the order
                        saveOrder(session.getCustomerDetails().getEmail(), orderItems);
                }
        }

        // Save Order
        @Transactional
        public void saveOrder(String userEmail, List<OrderItemRequest> items) {
                // Get the user
                User user = userRepository.findByEmail(userEmail).orElse(null);

                if (user != null) {

                        // Get total amount
                        Long totalAmount = calculateTotalAmount(items);

                        // create order
                        Order newOrder = Order.builder()
                                        .user(user)
                                        .amount(totalAmount)
                                        .build();

                        // Create list of order items
                        List<OrderItem> orderItems = new ArrayList<>();

                        Map<Long, Watch> watches = watchRepository.findAllById(
                                        items.stream().map(OrderItemRequest::getReference).toList()).stream()
                                        .collect(Collectors.toMap(Watch::getReference, Function.identity()));

                        for (OrderItemRequest item : items) {
                                Watch watch = Optional.ofNullable(watches.get(item.getReference()))
                                                .orElseThrow(() -> new EntityNotFoundException(
                                                                "Watch " + item.getBrand() + " " + item.getModel()
                                                                                + " Not Found"));

                                orderItems.add(createOrderItem(item, watch, newOrder));
                        }

                        // Set order items & Save the order
                        newOrder.setItems(orderItems);
                        orderRepository.save(newOrder);
                }
        }

        // Create new order item
        private OrderItem createOrderItem(OrderItemRequest item, Watch watch, Order order) {
                // Check stock
                if (watch.getQuantity() < item.getQuantity()) {
                        throw new InsufficientStockException(
                                        "Insufficient stock for: " + item.getBrand() + " "
                                                        + item.getModel()
                                                        + " max is " + watch.getQuantity());
                }

                // Update the stock
                watch.setQuantity(watch.getQuantity() - item.getQuantity());

                // Create order Item & append it to the list
                return OrderItem.builder()
                                .watch_reference(item.getReference())
                                .brand(item.getBrand())
                                .model(item.getModel())
                                .pictureUrl(item.getPictureUrl())
                                .price(item.getPrice())
                                .quantity(item.getQuantity())
                                .totalPrice(item.getQuantity() * item.getPrice())
                                .order(order)
                                .build();
        }

        // Calculate total order amount
        private Long calculateTotalAmount(List<OrderItemRequest> orderItems) {
                return orderItems.stream()
                                .mapToLong(item -> item.getPrice() * item.getQuantity())
                                .sum();
        }

        // Get all user orders by user ID
        public List<Order> getUserOrders(Authentication connectedUser) {
                // Get user
                User user = (User) connectedUser.getPrincipal();

                // Get all orders by user ID
                List<Order> orders = orderRepository.findAllByUserId(user.getId());
                return orders;
        }

        // Get all orders
        public PageResponse<GetAllOrdersResponse> getAllOrders(int page, int size) {

                Pageable pageable = PageRequest.of(page, size, Sort.by("creatDate").descending());

                Page<Order> orders = orderRepository.findAll(pageable);

                List<GetAllOrdersResponse> ordersList = orders.stream()
                                .map(or -> adminMapper.toGetAllOrdersResponse(or))
                                .toList();

                return new PageResponse<>(
                                ordersList,
                                orders.getNumber(),
                                orders.getSize(),
                                orders.getTotalElements(),
                                orders.getTotalPages(),
                                orders.isFirst(),
                                orders.isLast());
        }

        // Delete order by ID
        public void deleteOrdersById(UUID id) {
                // Get order by ID
                Order order = orderRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException("No Order found with the ID: " + id));

                // Delete the order from orders list in user so the its not referenced anymore
                // to the orders in that user and Hibernate can safely delete it
                User user = order.getUser();
                if (user != null) {
                        user.getOrders().remove(order);
                }
                orderRepository.delete(order);
        }

}
