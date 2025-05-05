package app.aurafitbackend.DTOS.DisplayDTOS;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.Size;
import app.aurafitbackend.Enums.Color;
import app.aurafitbackend.Enums.Material;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductVariantResponseDTO {
    private Long id;
    private UUID sku;
    private Size size;
    private Color color;
    private Material material;
    private BigDecimal price;
    private Integer stockQuantity;
    private boolean onSale;
    private Product product;
}
