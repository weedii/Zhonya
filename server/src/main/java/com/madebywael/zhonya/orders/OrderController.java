package com.madebywael.zhonya.orders;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService ordersService;

    // Place Order
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @RequestBody @Valid OrderRequest request) {

        return ResponseEntity.ok(ordersService.placeOrder(request));
    }

    // Get all orders for user
    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(Authentication connectedUser) {

        return ResponseEntity.ok(ordersService.getUserOrders(connectedUser));
    }

    // Stripe webhook
    @PostMapping("/webhook")
    public void webhook(
            @RequestHeader("Stripe-Signature") String sigHeader,
            @RequestBody String payload) {

        ordersService.webhook(sigHeader, payload);
    }

}
