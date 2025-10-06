package com.example.backend.Service;

import com.example.backend.Dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();
    UserDto updateUser(UserDto userDto,Long id);
    UserDto changePassword(UserDto userDto,Long id);
    void deleteUser(Long id);

}
