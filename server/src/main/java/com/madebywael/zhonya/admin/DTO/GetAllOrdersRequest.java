package com.madebywael.zhonya.admin.DTO;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record GetAllOrdersRequest(
                @NotNull(message = "Missing order ID") UUID id) {
}
