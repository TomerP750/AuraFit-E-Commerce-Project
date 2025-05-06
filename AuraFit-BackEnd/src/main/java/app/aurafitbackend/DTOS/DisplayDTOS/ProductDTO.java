package app.aurafitbackend.DTOS.DisplayDTOS;
import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.SubCategory;

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
    private SubCategory subCategory;
    private boolean onSale;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ProductVariantDTO> variants;
}
