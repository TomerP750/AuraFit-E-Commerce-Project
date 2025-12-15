package app.aurafitbackend.size;

import app.aurafitbackend.productType.ProductType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateSizeDTO {

    private String size;
    private ProductType productType;
}
