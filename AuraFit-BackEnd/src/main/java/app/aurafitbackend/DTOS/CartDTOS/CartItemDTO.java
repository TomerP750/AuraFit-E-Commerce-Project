package app.aurafitbackend.DTOS.CartDTOS;

import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CartItemDTO {

    private Long id;
    private ProductVariantDTO variant;
    private Integer quantity;
    private BigDecimal unitPrice;
    private Long cartId;

}
