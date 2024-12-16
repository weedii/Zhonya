package com.madebywael.zhonya.orders;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {

    private HttpStatus status;
    private String message;
    private String sessionId;
    private String sessionUrl;

}
