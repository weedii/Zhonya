package com.madebywael.zhonya.watch;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WatchRequest {

    @NotEmpty(message = "Missing Brand")
    @NotBlank(message = "Missing Brand")
    private String brand;

    @NotEmpty(message = "Missing Model")
    @NotBlank(message = "Missing Model")
    private String model;

    @NotEmpty(message = "Missing Description")
    @NotBlank(message = "Missing Description")
    private String description;

    @NotEmpty(message = "Missing Picture Url")
    @NotBlank(message = "Missing Picture Url")
    private String pictureUrl;

    @NotNull(message = "Missing Price")
    private Double price;

    private Long quantity;

}
