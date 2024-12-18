package com.madebywael.zhonya;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Hidden;

@RestController
@RequestMapping("/")
@Hidden
public class MainController {

    @GetMapping
    public String welcome() {
        return "<div style='height: 90vh; display: flex; justify-content: center; align-items: center;'><h1>WELCOME TO ZHONYA SERVER</h1></div>";
    }

}
