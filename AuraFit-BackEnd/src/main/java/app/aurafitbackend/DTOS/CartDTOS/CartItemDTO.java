package app.aurafitbackend.DTOS.CartDTOS;

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
    private Long variantId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private Long cartId;

}
