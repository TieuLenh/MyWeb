package com.javaWeb.Controllers;


import org.springframework.web.bind.annotation.*;
import com.javaWeb.Models.User;
import com.javaWeb.Services.UserService;
import com.javaWeb.dto.AuthRequest;
import com.javaWeb.dto.AuthRespone;


@RestController
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/api/login")
    public AuthRespone login(@RequestBody AuthRequest request) {
        User user = userService.login(request);
        return new AuthRespone(user.getId(), user.getUsername(), user.getRole());
    }


    @PostMapping("/api/register")
    public String register(@RequestBody AuthRequest request){
        userService.register(request);
        return "Register success";
    }

}     
//AuthController.java