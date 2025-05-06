package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.Gender;
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
//    public List<ProductVariantResponseDTO> getLatestItems() {
//        List<ProductVariantResponseDTO> dtos = new ArrayList<>();
//        List<ProductVariant> variants = productVariantRepository.findTop8ByCreatedAtDesc();
//
//        for (ProductVariant variant : variants) {
//            dtos.add(DtoToEntityMapper.variantToDto(variant));
//        }
//
//        return dtos;
//    }



//    ------------------ End Clothing Section ---------------------

//    ----------------- Other Section ------------------




}
