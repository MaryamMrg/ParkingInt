package com.example.backend.Auth;


import com.example.backend.Config.JwtService;
import com.example.backend.Dto.UserDto;
import com.example.backend.Model.Admin;
import com.example.backend.Model.Customer;
import com.example.backend.Model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request){
        User user;

        switch (request.getRole()){

            case ADMIN -> user=new Admin();

            case CUSTOMER -> user=new Customer();

            default -> throw new IllegalArgumentException("Invalid role: " + request.getRole());

        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        AuthResponse response = new AuthResponse();
        response.setToken(jwtToken);
        return response;
    }

    public AuthResponse authenticate(AuthRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        )
        );
        User user = userRepository.findByEmail(request.getEmail());
        String jwtToken = jwtService.generateToken(user);

        UserDto userDto=new UserDto(
                user.getName(),user.getEmail(),null,user.getRole()
        );

        AuthResponse response = new AuthResponse();
        response.setToken(jwtToken);
        response.setUser(userDto);
        return response;
    }
}
