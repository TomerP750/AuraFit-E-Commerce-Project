package app.aurafitbackend.DTOS;

import app.aurafitbackend.Beans.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateVariantDTO {

    private Long id;
    private Size size;
    private Color color;
    private Material material;
    private BigDecimal basePrice;
    private Integer stockQuantity;
    private Product product;
    private List<ProductVariantImage> imagesUrl;
}
