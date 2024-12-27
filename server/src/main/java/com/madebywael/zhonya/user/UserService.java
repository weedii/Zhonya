package com.madebywael.zhonya.user;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    @Value("${application.security.jwt.jwt-cookie-domain}")
    private String jwtCookieDomain;

    public void deleteUserAccount(Long userId, HttpServletResponse response) {
        // Logout the user
        Cookie jwtCookie = new Cookie("token", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        jwtCookie.setDomain(jwtCookieDomain);
        jwtCookie.setSecure(true);
        response.addCookie(jwtCookie);

        // Delete user account
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with the ID: " + userId));
        userRepository.delete(user);
    }

}
