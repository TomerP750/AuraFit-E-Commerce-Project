package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.AuthResponse;
import app.aurafitbackend.DTOS.LoginRequest;
import app.aurafitbackend.DTOS.RegisterRequest;
import app.aurafitbackend.Enums.Role;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.Repositories.CartRepository;
import app.aurafitbackend.Repositories.UserRepository;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    @Transactional
    public AuthResponse register(RegisterRequest registerRequest) {

        if (UserCredentialsValidateService.checkSuccessRegister(registerRequest)) {
            String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
            User user = User.builder()
                    .email(registerRequest.getEmail())
                    .firstName(registerRequest.getFirstName())
                    .lastName(registerRequest.getLastName())
                    .password(encodedPassword)
                    .role(Role.USER)
                    .build();
            userRepository.save(user);

            String token = jwtUtil.generateToken(user.getId());

            return new AuthResponse(token);

        }
        return null;
    }


    public AuthResponse login(LoginRequest loginRequest) {

        if (loginSuccessful(loginRequest)) {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            String token = jwtUtil.generateToken(userDetails.getUser().getId());

            return new AuthResponse(token);
        }

        throw new InvalidInputException("Email or Password are wrong");

    }

    private boolean loginSuccessful(LoginRequest loginRequest) {
        return userRepository.existsByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
