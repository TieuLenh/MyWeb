package com.javaWeb.dto;
import com.javaWeb.enums.Role;

public class AuthRespone {
    private long id;
    private String username;
    private Role role;

    public AuthRespone(long id, String username, Role role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public long getId() {
        return id;
    }

    
}