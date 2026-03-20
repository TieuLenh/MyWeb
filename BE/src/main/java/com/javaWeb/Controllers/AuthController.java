package com.javaWeb.Controllers;


import org.springframework.web.bind.annotation.*;
import com.javaWeb.Models.User;
import com.javaWeb.Services.UserService;
import com.javaWeb.dto.AuthRequest;
import com.javaWeb.dto.AuthRespone;


@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthRespone login(@RequestBody AuthRequest request) {
        User user = userService.login(request);
        return new AuthRespone(user.getId(), user.getUsername(), user.getRole());
    }
    
    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request){
        boolean isRegistered = userService.register(request);
        if (!isRegistered) {
            return "Register failed";
        }
        return "Register success";
    }

}     
//AuthController.java