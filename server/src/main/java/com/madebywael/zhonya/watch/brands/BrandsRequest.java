package com.madebywael.zhonya.watch.brands;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrandsRequest {

    @NotEmpty(message = "Missing Brand")
    @NotBlank(message = "Missing Brand")
    private String brand;

}
