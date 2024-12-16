package com.madebywael.zhonya.orders;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequest {

    @NotNull(message = "Missing watch reference")
    private Long reference;

    @NotEmpty(message = "Missing watch brand")
    @NotBlank(message = "Missing watch brand")
    private String brand;

    @NotEmpty(message = "Missing watch Model")
    @NotBlank(message = "Missing watch Model")
    private String model;

    @NotEmpty(message = "Missing watch picture url")
    @NotBlank(message = "Missing watch picture url")
    private String pictureUrl;

    @NotNull(message = "Missing watch price")
    private Long price;

    @NotNull(message = "Missing watch quantity")
    private Long quantity;

}
