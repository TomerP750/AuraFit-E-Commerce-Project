package app.aurafitbackend.productVariant;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import app.aurafitbackend.color.Color;
import app.aurafitbackend.product.ProductDTO;
import app.aurafitbackend.material.Material;
import app.aurafitbackend.size.Size;
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
//    @JsonBackReference
    private ProductDTO product;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ProductVariantImageDTO> images;
}
