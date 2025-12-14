package app.aurafitbackend.order;

import app.aurafitbackend.productVariant.ProductVariantDTO;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponseDTO {
    private Long id;
    private ProductVariantDTO variant;
    private Integer quantity;
    private Integer totalPrice;
    private BigDecimal unitPrice;
}
