package com.example.backend.Service;

import com.example.backend.Dto.UserDto;
import com.example.backend.Model.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }
    public List<UserDto> getUsers(){
        List<User> users = userRepository.findAll();
        return userMapper.toDtos(users);
    }
    public UserDto updateUser(UserDto userDto , Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null){
            throw new RuntimeException("user not found");
        }
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return userMapper.toDto(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
