package com.javaWeb.Controllers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.javaWeb.Models.User;
import com.javaWeb.Services.UserService;
import com.javaWeb.dto.AuthRespone;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @GetMapping
    public List<AuthRespone> getUsers(){
        return service.getAllPublicInfor();
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return service.save(user);
    }

}