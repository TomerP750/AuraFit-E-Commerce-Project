package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.DTOS.CreateDTOS.ProductVariantCreateDto;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;
import app.aurafitbackend.Enums.Gender;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.CategoryRepository;
import app.aurafitbackend.Repositories.ProductRepository;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.ReviewRepository;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Utils.GeneralValidator;
import app.aurafitbackend.Utils.ProductVariantValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductVariantService {

    private final ProductVariantRepository productVariantRepository;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public List<ProductVariant> getAllProductVariants() {
        return productVariantRepository.findAll();
    }

    public ProductVariant getProductVariant(Long id) {
        return productVariantRepository.findById(id).orElseThrow(()->new NotExistsException("Product variant not found"));
    }

    public void deleteVariant(Long id) {
        productRepository.deleteById(id);
    }


    @Transactional
    public void createNewProductVariant(ProductVariantCreateDto newProductVariant) {
        if (ProductVariantValidator.isValidNewProductVariant(newProductVariant)) {
            Product product = productRepository.findById(newProductVariant.getProduct().getId()).orElseThrow(()->new NotExistsException("Product not found"));
            ProductVariant productVariant = ProductVariant.builder()
                    .color(newProductVariant.getColor())
                    .basePrice(newProductVariant.getBasePrice())
                    .salePrice(BigDecimal.ZERO)
                    .size(newProductVariant.getSize())

                    .material(newProductVariant.getMaterial())
//                    .productImages(newProductVariant.getProduct())
                    .onSale(false)
                    .sku( "AF"+System.currentTimeMillis())
                    .stockQuantity(newProductVariant.getStockQuantity())
                    .product(newProductVariant.getProduct())
                    .build();
            product.getVariants().add(productVariant);
            productRepository.save(product);
        }
    }



    public List<Review> getProductVariantReviews(Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(()->new NotExistsException("Product variant not found"));
        return productVariant.getProduct().getReviews();
    }

    public ProductVariantDTO oneProductVariant(Long variantId) {
        ProductVariant variant = productVariantRepository.findById(variantId).orElseThrow(()->new NotExistsException("Product not found"));
        return EntityDTOMapper.variantToDto(variant);
    }


//    ------------ TEST THESE METHODS AREA
    public List<ProductVariant> getAllMensClothing() {
        Category category = categoryRepository.findByName("Clothing");
        List<Product> allMenClothingProducts = productRepository.findByGenderAndCategory(Gender.MEN,category);
        List<ProductVariant> menMerch = new ArrayList<>();
        // LA LAKERS SHIRT - get all variants like purple and yellow
        // MIAMI HEAT - red and white

        for (Product product : allMenClothingProducts) {
            for (ProductVariant variant : product.getVariants()) {
                menMerch.add(variant);
            }
        }

        return menMerch;

    }
//
//    public List<ProductVariantDTO> getAllWomensClothing() {
//        List<Product> allWomenClothingProducts = productRepository.findByGenderAndCategory(Gender.WOMEN, Category.CLOTHING);
//        List<ProductVariantDTO> womenMerch = new ArrayList<>();
//
//        for (Product product : allWomenClothingProducts) {
//            for (ProductVariant variant : product.getVariants()) {
//                womenMerch.add(EntityDTOMapper.variantToDto(variant));
//            }
//        }
//
//        return womenMerch;
//    }

//    -------------- END TEST THESE METHODS AREA ----------------



}
