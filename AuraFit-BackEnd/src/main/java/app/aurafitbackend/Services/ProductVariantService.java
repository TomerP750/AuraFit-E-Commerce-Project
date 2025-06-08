package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.CreateDTOS.ProductVariantCreateDto;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;
import app.aurafitbackend.DTOS.UpdateVariantDTO;
import app.aurafitbackend.Enums.Gender;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.CategoryRepository;
import app.aurafitbackend.Repositories.ProductRepository;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.ReviewRepository;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Utils.ProductVariantValidator;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductVariantService {

    private final ProductVariantRepository productVariantRepository;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public List<ProductVariantDTO> getLatestVariants() {
        return productVariantRepository
                .findTop8ByOrderByCreatedAtDesc()
                .stream()
                .map(EntityDTOMapper::toVariantDTO)
                .collect(Collectors.toList());
    }


    public List<ProductVariant> getProductVariantsByProductId(Long productId) {
        return productVariantRepository.findByProductId(productId);
    }
    public List<ProductVariant> getAllProductVariants() {
        return productVariantRepository.findAll();
    }

//    public Page<ProductVariant> getAllProductVariants(Pageable pageable) {
//        return productVariantRepository.findAll(pageable);
//    }

    public ProductVariant getProductVariant(Long id) {
        return productVariantRepository.findById(id).orElseThrow(()->new NotExistsException("Product variant not found"));
    }

    public void deleteVariant(Long id) {
        productVariantRepository.deleteById(id);
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
                    .sku(generateSku(newProductVariant))
                    .stockQuantity(newProductVariant.getStockQuantity())
                    .product(newProductVariant.getProduct())
                    .build();
            product.getVariants().add(productVariant);
            productRepository.save(product);
        }
    }

    private String generateSku(ProductVariantCreateDto dto) {
        // Base parts
        String idPart    = String.format("%04d", dto.getProduct().getId());
        String namePart  = dto.getProduct().getName()
                .replaceAll("\\s+", "")
                .substring(0, Math.min(3, dto.getProduct().getName().length()))
                .toUpperCase();
        String colorPart = dto.getColor().getColor()
                .replaceAll("\\s+", "")
                .toUpperCase();
        String sizePart  = dto.getSize().getSize().toUpperCase();

        // Random 4-digit suffix (0000–9999)
        int randomSuffix = ThreadLocalRandom.current().nextInt(0, 10000);
        String randPart  = String.format("%04d", randomSuffix);

        return String.format("AF-%s-%s-%s-%s-%s",
                idPart,
                namePart,
                colorPart,
                sizePart,
                randPart);
    }


    public List<Review> getProductVariantReviews(Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(()->new NotExistsException("Product variant not found"));
        return productVariant.getProduct().getReviews();
    }

    public ProductVariantDTO oneProductVariant(Long variantId) {
        ProductVariant variant = productVariantRepository.findById(variantId).orElseThrow(()->new NotExistsException("Product not found"));
        return EntityDTOMapper.variantToDto(variant);
    }

    public void updateVariant(UpdateVariantDTO updatedProductVariant) {
        if (ProductVariantValidator.isValidProductVariantCredentials(updatedProductVariant)) {
            ProductVariant productVariant = productVariantRepository.findById(updatedProductVariant.getId())
                    .orElseThrow(() -> new NotExistsException("Product variant not found"));
            productVariant.setColor(updatedProductVariant.getColor());
            productVariant.setBasePrice(updatedProductVariant.getBasePrice());
            productVariant.setSalePrice(BigDecimal.ZERO);
            productVariant.setSize(updatedProductVariant.getSize());
            productVariant.setMaterial(updatedProductVariant.getMaterial());
            productVariant.setStockQuantity(updatedProductVariant.getStockQuantity());
            productVariant.setProduct(updatedProductVariant.getProduct());
            productVariant.setProductImages(updatedProductVariant.getImagesUrl());
            productVariant.setOnSale(false);
            productVariantRepository.save(productVariant);
        }

    }






//    ------------ TEST THESE METHODS AREA

    public List<ProductVariant> allClothingByGender(Gender gender) {
        Category clothingCategory = categoryRepository.findByName("Clothing");
        return productRepository
                .findByGenderAndCategory(gender, clothingCategory).stream()
                .flatMap(p -> p.getVariants().stream())
                .collect(Collectors.toList());
    }

//    public List<ProductVariant> allVariantsByGender(Gender gender) {
//        List<Product> getProductsByGender = productRepository.findByGender(gender);
//
//        Category clothingCategory = categoryRepository.findByName("Clothing");
//        return productRepository
//                .findByGenderAndCategory(gender, clothingCategory).stream()
//                .flatMap(p -> p.getVariants().stream())
//                .collect(Collectors.toList());
//    }


    public List<ProductVariant> allVariantsByCategoryAndProductTypeAndGender(String category, String productType, String gender) {
        return null;
    }

    public Page<ProductVariant> search(String q, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("product.name").ascending());
        return productVariantRepository.search(q, pageable);
    }


//    -------------- END TEST THESE METHODS AREA ----------------



}
