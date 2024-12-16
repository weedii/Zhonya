package com.madebywael.zhonya.watch;

import org.springframework.stereotype.Service;

@Service
public class WatchMapper {

    public WatchResponse toWatchResponse(Watch watch) {
        return WatchResponse.builder()
                .reference(watch.getReference())
                .brand(watch.getBrand())
                .model(watch.getModel())
                .description(watch.getDescription())
                .pictureUrl(watch.getPictureUrl())
                .price(watch.getPrice())
                .quantity(watch.getQuantity())
                .build();
    }

}
