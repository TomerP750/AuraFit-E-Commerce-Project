package app.aurafitbackend.DTOS.DisplayDTOS;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import app.aurafitbackend.Beans.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductVariantDTO {
    private Long id;
    private String sku;
    private Size size;
    private Color color;
    private Material materials;
    private BigDecimal basePrice;
    private BigDecimal salePrice;
    private Integer stockQuantity;
    private boolean onSale;
    private ProductDTO product;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ProductVariantImage> images;
}
