package com.madebywael.zhonya.auth;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import com.madebywael.zhonya.config.JwtService;
import com.madebywael.zhonya.user.Role;
import com.madebywael.zhonya.user.User;
import com.madebywael.zhonya.user.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    @Value("${application.frontend.social-signin-redirect-url}")
    private String socialSigninRedirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        // Extract user details from authentication
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        Map<String, Object> attributes = authToken.getPrincipal().getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        // Check if user exists
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            // Register new user
            User newUser = User.builder()
                    .name(name)
                    .email(email)
                    .role(Role.USER)
                    .build();
            return userRepository.save(newUser);
        });

        // Add extra info to the token
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", user.getId());
        extraClaims.put("name", user.getName());
        extraClaims.put("role", user.getRole());

        // generate the token
        String token = jwtService.generateToken(extraClaims, user);

        // Create cookie with the token & Add it to response
        Cookie jwtCookie = new Cookie("token", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);
        response.sendRedirect(socialSigninRedirectUrl);

        super.onAuthenticationSuccess(request, response, authentication);
    }

}
