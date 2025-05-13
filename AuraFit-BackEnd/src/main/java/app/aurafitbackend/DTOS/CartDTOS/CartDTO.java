package app.aurafitbackend.DTOS.CartDTOS;

import app.aurafitbackend.Enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CartDTO {

    private Long id;
    private List<CartItemDTO> items;
    private BigDecimal shippingCost;
    private BigDecimal subTotal;
    private BigDecimal totalCartPrice;
    private Status status;
    private Long userId;
    private String cartToken;


}
