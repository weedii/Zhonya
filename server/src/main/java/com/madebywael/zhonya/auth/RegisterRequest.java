package com.madebywael.zhonya.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    @NotEmpty(message = "Name is missing")
    @NotBlank(message = "Name is missing")
    private String name;

    @Email(message = "Email not formatted")
    @NotEmpty(message = "Email is missing")
    @NotBlank(message = "Email is missing")
    private String email;

    @Size(min = 8, message = "Password should be 8 characters long minimum")
    @NotEmpty(message = "Password is missing")
    @NotBlank(message = "Password is missing")
    private String password;

}
