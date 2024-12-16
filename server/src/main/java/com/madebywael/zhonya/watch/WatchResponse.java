package com.madebywael.zhonya.watch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WatchResponse {

    private Long reference;
    private String brand;
    private String model;
    private String description;
    private String pictureUrl;
    private Double price;
    private Long quantity;

}
