package com.madebywael.zhonya.auth;

import com.madebywael.zhonya.user.Role;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;

}
