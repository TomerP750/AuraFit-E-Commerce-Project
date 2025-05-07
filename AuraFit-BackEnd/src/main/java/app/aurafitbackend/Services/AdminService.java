package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.AuthDTOS.RegisterRequest;
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

//    ----------- Product Section -----------

    @Transactional
    public void createProduct(ProductCreateDTO newProductDTO) {
        if (GeneralValidator.isValidProduct(newProductDTO)) {

            Product product = EntityDTOMapper.toEntity(newProductDTO);
            productRepository.save(product);
        }
    }

    @Transactional
    public void addVariantToProduct(Long productId , ProductVariant newProductVariant) {
        if (GeneralValidator.isValidProductVariant(newProductVariant)) {
            Product product = productRepository.findById(productId).orElseThrow(()->new NotExistsException("Product not found"));
            ProductVariant productVariant = ProductVariant.builder()
                    .color(newProductVariant.getColor())
                    .basePrice(newProductVariant.getBasePrice())
                    .salePrice(BigDecimal.ZERO)
                    .size(newProductVariant.getSize())
                    .material(newProductVariant.getMaterial())
                    .productImages(newProductVariant.getProductImages())
                    .onSale(false)
                    .stockQuantity(newProductVariant.getStockQuantity())
                    .product(product)
                    .build();
            product.getVariants().add(productVariant);
            productRepository.save(product);
            productVariantRepository.save(productVariant);
        }
    }

//    Category Section





}
