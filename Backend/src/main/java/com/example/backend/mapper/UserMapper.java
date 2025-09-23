package com.example.backend.mapper;

import com.example.backend.Dto.UserDto;
import com.example.backend.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.control.MappingControl;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserDto userDto);

    UserDto toDto(User user);

    List<UserDto> toDtos(List<User> users);

}
