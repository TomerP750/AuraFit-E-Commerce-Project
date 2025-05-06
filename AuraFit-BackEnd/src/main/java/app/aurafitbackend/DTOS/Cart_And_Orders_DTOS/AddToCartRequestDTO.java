package app.aurafitbackend.DTOS.Cart_And_Orders_DTOS;

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
