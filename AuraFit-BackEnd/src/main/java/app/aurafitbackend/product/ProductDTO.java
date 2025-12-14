package app.aurafitbackend.product;


import app.aurafitbackend.productVariant.ProductVariantDTO;
import app.aurafitbackend.category.Category;
import app.aurafitbackend.Enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Category category;
    private Gender gender;
    private ProductType productType;
    private boolean onSale;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    //TODO maybe comment variants
//    @JsonManagedReference
    private List<ProductVariantDTO> variants;
}
