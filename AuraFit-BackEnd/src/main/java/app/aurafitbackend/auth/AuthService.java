package app.aurafitbackend.auth;

import app.aurafitbackend.cart.Cart;
import app.aurafitbackend.user.User;
import app.aurafitbackend.auth.AuthDTOS.AuthResponse;
import app.aurafitbackend.auth.AuthDTOS.LoginRequest;
import app.aurafitbackend.auth.AuthDTOS.RegisterRequest;
import app.aurafitbackend.Enums.Role;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.cart.CartRepository;
import app.aurafitbackend.user.UserRepository;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Security.JwtUtil;
import app.aurafitbackend.Utils.GeneralValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@AllArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest registerRequest) {
        if (GeneralValidator.successfulUserRegister(registerRequest)) {
            String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
            User user = User.builder()
                    .email(registerRequest.getEmail())
                    .firstName(registerRequest.getFirstName())
                    .lastName(registerRequest.getLastName())
                    .password(encodedPassword)
                    .role(Role.ADMIN)
                    .membershipPoints(0)
                    .build();
            userRepository.save(user);

            Cart cart = Cart.builder()
                    .user(user)
                    .subTotal(BigDecimal.ZERO)
                    .totalCartPrice(BigDecimal.ZERO)
                    .shippingCost(BigDecimal.ZERO)
                    .status(Status.PENDING)
                    .build();
            cartRepository.save(cart);

            LoginRequest loginRequest = new LoginRequest(registerRequest.getEmail(), registerRequest.getPassword());
            return login(loginRequest);
        }

        throw new InvalidInputException("One of the credentials is incorrect");
    }

    public AuthResponse login(LoginRequest loginRequest) {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails.getUser().getId());

        return new AuthResponse(token);
    }


//    Temporary delete after it will have cookies

    public void logout(String token) {

    }

}


