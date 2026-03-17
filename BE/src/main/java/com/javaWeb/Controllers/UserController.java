package com.javaWeb.Controllers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.javaWeb.Models.User;
import com.javaWeb.Services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @GetMapping
    public List<User> getUsers(){
        return service.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return service.save(user);
    }

}