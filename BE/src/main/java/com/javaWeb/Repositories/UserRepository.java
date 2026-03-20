package com.javaWeb.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javaWeb.Models.User;
import com.javaWeb.dto.AuthRespone;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
    
    @Query("SELECT new com.javaWeb.dto.AuthRespone(u.id, u.username, u.role) FROM User u")
    List<AuthRespone> getAllPublicUsers();

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.username = :username")
    boolean existsUser(@Param("username") String username);
}