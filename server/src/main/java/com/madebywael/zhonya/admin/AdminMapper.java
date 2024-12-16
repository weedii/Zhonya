package com.madebywael.zhonya.admin;

import org.springframework.stereotype.Service;

import com.madebywael.zhonya.admin.DTO.GetAllOrdersResponse;
import com.madebywael.zhonya.admin.DTO.GetAllUsersResponse;
import com.madebywael.zhonya.orders.Order;
import com.madebywael.zhonya.user.User;

@Service
public class AdminMapper {

    public GetAllUsersResponse toGetAllUsersResponse(User user) {
        return GetAllUsersResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public GetAllOrdersResponse toGetAllOrdersResponse(Order order) {
        return GetAllOrdersResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .amount(order.getAmount())
                .creatDate(order.getCreatDate())
                .items(order.getItems())
                .build();
    }

}
