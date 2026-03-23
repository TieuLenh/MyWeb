package com.javaWeb.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

import com.javaWeb.Repositories.UserRepository;
import com.javaWeb.dto.AuthRequest;
import com.javaWeb.enums.Role;
import com.javaWeb.Models.User;



@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers(){
        return repo.findAll();
    }

    public User save(User user){
        return repo.save(user);
    }

    public List<User> getAllPublicInfor(){
        return repo.getAllPublicUsers().stream()
                .map(authRespone -> {
                    User user = new User();
                    user.setId(authRespone.getId());
                    user.setUsername(authRespone.getUsername());
                    user.setRole(authRespone.getRole());
                    return user;
                })
                .toList();
    }

    // Take PasswordEncoder as a dependency to encode and verify passwords
    @Autowired
    private PasswordEncoder pe;


    // Login method that checks if the provided username and password match any user in the database
    public User login(AuthRequest request){ 
        User user = repo.findByUsername(request.getUsername()); // Retrieve users are matching the provided username
        if (user != null && pe.matches(request.getPassword(), user.getPassword())) {
            return user; // If a matching user is found, return the user object
        }
        return null; // if no matching user is found, return null
    }

    // Register method that creates a new user, user can regist with the same username but different password
    public boolean register(AuthRequest request){
        // check if the username already exists in the database
        User user = repo.findByUsername(request.getUsername());
        if (user != null) {
            return false; // Username already exists
        }
        // If the username is not already taken, create a new user object and save it to the database
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        String encodedPassword = pe.encode(request.getPassword());
        newUser.setPassword(encodedPassword);
        newUser.setRole(Role.USER);
        repo.save(newUser);
        return true;
    }

    public void coercionSetPassword(User user, String newPassword){
        String encodedPassword = pe.encode(newPassword);
        user.setPassword(encodedPassword);
        repo.save(user);
    }
}