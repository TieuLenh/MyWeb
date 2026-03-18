package com.javaWeb.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaWeb.Models.User;
import com.javaWeb.dto.AuthRespone;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsernameAndPassword(String username, String password);
    
    @Query("SELECT new com.javaWeb.dto.AuthRespone(u.id, u.username, u.role) FROM User u")
    List<AuthRespone> getAllPublicUsers();

    
}