package com.javaWeb.Controllers;


import org.springframework.web.bind.annotation.*;
import com.javaWeb.Models.User;
import com.javaWeb.Services.UserService;
import com.javaWeb.dto.LoginRequest;
import com.javaWeb.dto.RegisterRequest;

@RestController
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/api/login")
    public User login(@RequestBody LoginRequest request) {

        User user = userService.login(
            request.getUsername(),
            request.getPassword()
        );

        return user;
    }


    @PostMapping("/api/register")
    public String register(@RequestBody RegisterRequest request){

        userService.register(request);

        return "Register success";
    }

}     
//AuthController.java