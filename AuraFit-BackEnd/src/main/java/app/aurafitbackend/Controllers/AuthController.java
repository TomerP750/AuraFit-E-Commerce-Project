package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.AuthResponse;
import app.aurafitbackend.DTOS.LoginRequest;
import app.aurafitbackend.DTOS.RegisterRequest;
import app.aurafitbackend.Enums.Role;
import app.aurafitbackend.Services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }


    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }


}
