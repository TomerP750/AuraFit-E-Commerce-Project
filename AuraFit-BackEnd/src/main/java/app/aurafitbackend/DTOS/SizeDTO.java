package app.aurafitbackend.DTOS;

import app.aurafitbackend.Beans.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class SizeDTO {
    private Long id;
    private String size;
    private ProductType productType;
}
