package com.javaWeb.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.javaWeb.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsernameAndPassword(String username, String password);
}