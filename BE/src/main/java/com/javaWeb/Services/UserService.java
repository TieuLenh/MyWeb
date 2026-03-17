package com.javaWeb.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

import com.javaWeb.Repositories.UserRepository;
import com.javaWeb.dto.RegisterRequest;
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

    public User login(String username, String password) {
        User user = repo.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    @Autowired
    private PasswordEncoder pe;

    public void register(RegisterRequest request){

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

}