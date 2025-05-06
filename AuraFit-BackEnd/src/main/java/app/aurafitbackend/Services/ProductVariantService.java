package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;
import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.Gender;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.ProductRepository;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.ReviewRepository;
import app.aurafitbackend.Utils.EntityDTOMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductVariantService {

    private final ProductVariantRepository productVariantRepository;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public List<Review> getProductVariantReviews(Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(()->new NotExistsException("Product variant not found"));
        return productVariant.getProduct().getReviews();
    }

    public ProductVariantDTO oneProductVariant(Long variantId) {
        ProductVariant variant = productVariantRepository.findById(variantId).orElseThrow(()->new NotExistsException("Product not found"));
        return EntityDTOMapper.variantToDto(variant);
    }

//    ------------ TEST THESE METHODS AREA
    public List<ProductVariantDTO> getAllMensClothing() {

        List<Product> allMenClothingProducts = productRepository.findByGenderAndCategory(Gender.MEN, Category.CLOTHING);
        List<ProductVariantDTO> menMerch = new ArrayList<>();
        // LA LAKERS SHIRT - get all variants like purple and yellow
        // MIAMI HEAT - red and white

        for (Product product : allMenClothingProducts) {
            for (ProductVariant variant : product.getVariants()) {
                menMerch.add(EntityDTOMapper.variantToDto(variant));
            }
        }

        return menMerch;
    }

    public List<ProductVariantDTO> getAllWomensClothing() {
        List<Product> allWomenClothingProducts = productRepository.findByGenderAndCategory(Gender.WOMEN, Category.CLOTHING);
        List<ProductVariantDTO> womenMerch = new ArrayList<>();

        for (Product product : allWomenClothingProducts) {
            for (ProductVariant variant : product.getVariants()) {
                womenMerch.add(EntityDTOMapper.variantToDto(variant));
            }
        }

        return womenMerch;
    }

//    -------------- END TEST THESE METHODS AREA ----------------



}
