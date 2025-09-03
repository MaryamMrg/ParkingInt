package com.example.backend.Controller;

import com.example.backend.Dto.UserDto;
import com.example.backend.Service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<UserDto> getUsers() {return userService.getUsers();}



    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }



    @PutMapping("update/{userId}")
    public UserDto updateUser(@RequestBody UserDto userDto, @PathVariable Long userId) {
        return userService.updateUser(userDto, userId);
    }

    @PutMapping("password/{userId}")
    public  UserDto changePassWord(@RequestBody UserDto userDto,@PathVariable Long userId){
        return userService.changePassword(userDto,userId);
    }
}
