package com.madebywael.zhonya.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {

    @Email(message = "Email not formatted")
    @NotEmpty(message = "Email is missing")
    @NotBlank(message = "Email is missing")
    private String email;

    @Size(min = 8, message = "Password should be at least 8 characters long")
    @NotEmpty(message = "Password is missing")
    @NotBlank(message = "Password is missing")
    private String password;

}
