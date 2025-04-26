package app.aurafitbackend.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ShowProductPriceDTO {

    private Integer basePrice;
    private Integer salePrice;

}
