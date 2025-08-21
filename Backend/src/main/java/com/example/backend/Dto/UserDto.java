package com.example.backend.Dto;

import com.example.backend.Model.Role;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public class UserDto {

    private Long userId;

    private String name;
    private String email;
    private String password;
    private Role role;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public UserDto(Role role, String password, String email, String name, Long userId) {
        this.role = role;
        this.password = password;
        this.email = email;
        this.name = name;
        this.userId = userId;
    }

    public UserDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
