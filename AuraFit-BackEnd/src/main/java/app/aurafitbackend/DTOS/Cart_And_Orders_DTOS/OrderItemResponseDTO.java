package app.aurafitbackend.DTOS.Cart_And_Orders_DTOS;

import app.aurafitbackend.Beans.ProductVariant;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponseDTO {
    private Long id;
    private ProductVariant productVariant;
    private Integer quantity;
    private Integer totalPrice;
    private BigDecimal unitPrice;
}
