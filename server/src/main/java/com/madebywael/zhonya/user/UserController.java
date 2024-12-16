package com.madebywael.zhonya.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @DeleteMapping("{user-id}")
    public ResponseEntity<?> deleteUserAccount(
            @PathVariable("user-id") Long userId) {

        userService.deleteUserAccount(userId);
        return ResponseEntity.ok().build();
    }

}
