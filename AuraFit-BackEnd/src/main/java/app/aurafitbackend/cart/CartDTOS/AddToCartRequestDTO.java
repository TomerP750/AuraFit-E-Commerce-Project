package app.aurafitbackend.cart.CartDTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddToCartRequestDTO {
    private Long variantId;
    private Integer quantity;
}
