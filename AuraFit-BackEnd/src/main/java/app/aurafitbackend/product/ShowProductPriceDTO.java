package app.aurafitbackend.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ShowProductPriceDTO {

    private Integer basePrice;
    private Integer salePrice;

}
