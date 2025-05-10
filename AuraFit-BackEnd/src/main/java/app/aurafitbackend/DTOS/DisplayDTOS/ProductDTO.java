package app.aurafitbackend.DTOS.DisplayDTOS;


import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Beans.ProductType;
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
    private String description;
    private Category category;
    private ProductType productType;
    private boolean onSale;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ProductVariantDTO> variants;
}
