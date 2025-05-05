package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantResponseDTO;
import app.aurafitbackend.DTOS.Utils.DtoToEntityMapper;
import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.Gender;
import app.aurafitbackend.Enums.SubCategory;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.OrderItemRepository;
import app.aurafitbackend.Repositories.ProductRepository;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final OrderItemRepository orderItemRepository;



//    -------------------- Clothing Section ----------------------
    public List<ProductVariantResponseDTO> getLatestItems() {
        List<ProductVariantResponseDTO> dtos = new ArrayList<>();
        List<ProductVariant> variants = productVariantRepository.findTop8ByCreatedAtDesc();

        for (ProductVariant variant : variants) {
            dtos.add(DtoToEntityMapper.variantToDto(variant));
        }

        return dtos;
    }

    public List<ProductVariantResponseDTO> getAllMensProductVariant() {
        List<Product> allMenClothingProducts = productRepository.findByGenderAndSubCategory(Gender.MEN, Category.CLOTHING);
        List<ProductVariantResponseDTO> menMerch = new ArrayList<>();
        // LA LAKERS SHIRT - get all variants like purple and yellow
        // MIAMI HEAT - red and white

        for (Product product : allMenClothingProducts) {
            for (ProductVariant variant : product.getVariants()) {
                menMerch.add(DtoToEntityMapper.variantToDto(variant));
            }
        }

        return menMerch;
    }

    public List<ProductVariantResponseDTO> getAllWomensProductVariantByCategory(Category category) {
        List<Product> allWomenClothingProducts = productRepository.findByGenderAndSubCategory(Gender.WOMEN, Category.CLOTHING);
        List<ProductVariantResponseDTO> womenMerch = new ArrayList<>();

        for (Product product : allWomenClothingProducts) {
            for (ProductVariant variant : product.getVariants()) {
                womenMerch.add(DtoToEntityMapper.variantToDto(variant));
            }
        }

        return womenMerch;
    }

//    ------------------ End Clothing Section ---------------------

//    ----------------- Other Section ------------------




}
