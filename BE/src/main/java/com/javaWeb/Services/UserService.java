package com.javaWeb.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

import com.javaWeb.Repositories.UserRepository;
import com.javaWeb.dto.AuthRequest;
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

    @Autowired
    private PasswordEncoder pe;

    public User login(AuthRequest request){ 
        User user = repo.findByUsername(request.getUsername());
        if (user != null && pe.matches(request.getPassword(), user.getPassword())) {
            return user;
        }
        return null;
    }

    public void register(AuthRequest request){

        if(repo.existsByUsernameAndPassword(
                request.getUsername(),
                request.getPassword()
        )){
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        String encodedPassword = pe.encode(request.getPassword());
        user.setPassword(encodedPassword);
        user.setRole("USER");
        repo.save(user);
    }

    public void coercionSetPassword(User user, String newPassword){
        String encodedPassword = pe.encode(newPassword);
        user.setPassword(encodedPassword);
        repo.save(user);
    }
}