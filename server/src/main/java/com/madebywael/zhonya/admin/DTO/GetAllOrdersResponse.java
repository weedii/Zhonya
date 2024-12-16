package com.madebywael.zhonya.admin.DTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.madebywael.zhonya.orders.OrderItem;

import lombok.Builder;

@Builder
public record GetAllOrdersResponse(
                UUID id,
                Long userId,
                String userEmail,
                long amount,
                LocalDateTime creatDate,
                List<OrderItem> items) {
}
