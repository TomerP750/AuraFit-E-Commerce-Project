package app.aurafitbackend.admin;

import app.aurafitbackend.product.ProductRepository;
import app.aurafitbackend.productVariant.ProductVariantRepository;
import app.aurafitbackend.promotion.PromotionRepository;
import app.aurafitbackend.review.ReviewRepository;
import app.aurafitbackend.user.User;
import app.aurafitbackend.auth.AuthDTOS.RegisterRequest;
import app.aurafitbackend.user.UserDTO;
import app.aurafitbackend.Enums.Role;
import app.aurafitbackend.Utils.GeneralValidator;
import app.aurafitbackend.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PromotionRepository promotionRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;


    public void createAdmin(RegisterRequest registerRequest) {
        if (GeneralValidator.successfulUserRegister(registerRequest)) {
            String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
            User admin  = User.builder()
                    .firstName(registerRequest.getFirstName())
                    .lastName(registerRequest.getLastName())
                    .email(registerRequest.getEmail())
                    .password(encodedPassword)
                    .role(Role.ADMIN)
                    .membershipPoints(0)
                    .build();
            userRepository.save(admin);
        }
    }


    public Page<UserDTO> allUsers(Pageable pageable) {

        Page<User> users = userRepository.findAll(pageable);

        return users.map(u -> UserDTO.builder()
                .id(u.getId())
                .firstName(u.getFirstName())
                .lastName(u.getLastName())
                .email(u.getEmail())
                .role(u.getRole())
                .build()
        );
    }







}
