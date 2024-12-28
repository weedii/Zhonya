package com.madebywael.zhonya.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.madebywael.zhonya.config.JwtService;
import com.madebywael.zhonya.user.Role;
import com.madebywael.zhonya.user.User;
import com.madebywael.zhonya.user.UserRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        @Value("${application.security.jwt.jwt-cookie-domain}")
        private String jwtCookieDomain;
        @Value("${application.security.jwt.expiration}")
        private int jwtExpiration;

        public AuthenticationResponse register(@Valid RegisterRequest request, HttpServletResponse response) {
                // check if admin already exists
                if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                        throw new EntityExistsException("Email is already in use");
                }

                // save the user
                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                userRepository.save(user);

                // add extra info to the token
                Map<String, Object> extraClaims = new HashMap<>();
                extraClaims.put("id", user.getId());
                extraClaims.put("name", user.getName());
                extraClaims.put("role", user.getRole());

                // generate the token
                String token = jwtService.generateToken(extraClaims, user);

                // Create cookie manually with the token & Add it to response header
                String cookieValue = String.format(
                                "token=%s; Domain=%s; Max-Age=%d; Path=/; SameSite=None; Secure; HttpOnly",
                                token,
                                jwtCookieDomain,
                                jwtExpiration);

                response.addHeader("Set-Cookie", cookieValue);

                return AuthenticationResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .build();
        }

        public AuthenticationResponse authenticate(
                        @Valid AuthenticationRequest request, HttpServletResponse response) {
                // check if the user exist in the DB
                if (!userRepository.findByEmail(request.getEmail()).isPresent()) {
                        throw new UsernameNotFoundException("User Not found");
                }

                // authenticate the user
                var auth = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));

                // get the authenticated user
                User user = (User) auth.getPrincipal();

                // add extra info to the token
                Map<String, Object> extraClaims = new HashMap<>();
                extraClaims.put("id", user.getId());
                extraClaims.put("name", user.getName());
                extraClaims.put("role", user.getRole());

                // generate token
                String token = jwtService.generateToken(extraClaims, user);

                // Create cookie manually with the token & Add it to response header
                String cookieValue = String.format(
                                "token=%s; Domain=%s; Max-Age=%d; Path=/; SameSite=None; Secure; HttpOnly",
                                token,
                                jwtCookieDomain,
                                jwtExpiration);

                response.addHeader("Set-Cookie", cookieValue);

                return AuthenticationResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .build();
        }

        public void registerAdmin(RegisterRequest request) {
                // check if admin already exists
                if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                        throw new IllegalArgumentException("This admin is already exists");
                }

                // save the admin
                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.ADMIN)
                                .build();
                userRepository.save(user);
        }

        public void signout(HttpServletResponse response) {
                // Create cookie manually with the token & Add it to response header
                String cookieValue = String.format(
                                "token=%s; Domain=%s; Max-Age=%d; Path=/; SameSite=None; Secure; HttpOnly",
                                null,
                                jwtCookieDomain,
                                0);

                response.addHeader("Set-Cookie", cookieValue);
        }

}
