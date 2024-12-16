package com.madebywael.zhonya.admin;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.madebywael.zhonya.admin.DTO.GetAllOrdersResponse;
import com.madebywael.zhonya.admin.DTO.GetAllUsersResponse;
import com.madebywael.zhonya.common.PageResponse;
import com.madebywael.zhonya.orders.OrderService;
import com.madebywael.zhonya.watch.WatchRequest;
import com.madebywael.zhonya.watch.WatchResponse;
import com.madebywael.zhonya.watch.WatchService;
import com.madebywael.zhonya.watch.brands.BrandsRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final WatchService watchService;
    private final OrderService ordersService;

    /*
     * users part
     */
    // Get all users
    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUsers() {

        return ResponseEntity.ok(adminService.getAllUsers());
    }

    /*
     * watches part
     */
    // Create new watch
    @PostMapping("/watches")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<WatchResponse> createWatch(
            @RequestBody @Valid WatchRequest request) {

        WatchResponse watch = watchService.createWatch(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(watch);
    }

    // Update watch by ID
    @PatchMapping("/watches/{watch-id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> updateWatchById(
            @PathVariable("watch-id") Long watchReference,
            @RequestBody WatchRequest request,
            Authentication connectedUser) {

        return ResponseEntity.ok(watchService.updateWatchById(watchReference, request, connectedUser));
    }

    // Delete watch by ID
    @DeleteMapping("/watches/{watch-id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<GetAllUsersResponse>> deleteWatchById(
            @PathVariable("watch-id") Long watchReference,
            Authentication connectedUser) {

        watchService.deleteWatchById(watchReference);
        return ResponseEntity.ok().build();
    }

    /*
     * Brands Part
     */
    // Get all brands
    @GetMapping("/brands")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<String>> getBrandsList() {

        return ResponseEntity.ok(watchService.getBrandsList());
    }

    // Create new brand
    @PostMapping("/brands")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> saveBrand(
            @RequestBody @Valid BrandsRequest request) {

        watchService.saveBrand(request);
        return ResponseEntity.ok().build();
    }

    // Delete brand
    @DeleteMapping("/brands")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteBrand(
            @RequestBody @Valid BrandsRequest request) {

        return ResponseEntity.ok(watchService.deleteBrand(request));
    }

    /*
     * Orders Part
     */
    // Get all orders
    @GetMapping("/orders")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PageResponse<GetAllOrdersResponse>> getAllOrders(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size) {

        return ResponseEntity.ok(ordersService.getAllOrders(page, size));
    }

    // Delete Order by ID
    @DeleteMapping("/orders/{order-id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteOrdersById(
            @PathVariable("order-id") UUID id) {

        ordersService.deleteOrdersById(id);
        return ResponseEntity.ok(null);
    }

}
