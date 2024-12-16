package com.madebywael.zhonya.admin.DTO;

import com.madebywael.zhonya.user.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetAllUsersResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;

}
