package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.AuthDTOS.RegisterRequest;
import app.aurafitbackend.DTOS.AuthDTOS.UserDTO;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Enums.Role;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.*;
import app.aurafitbackend.Utils.GeneralValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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


    public List<UserDTO> allUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();

        for (User user : users) {
            UserDTO dto = UserDTO.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .build();
            userDTOList.add(dto);
        }

        return userDTOList;

    }






}
