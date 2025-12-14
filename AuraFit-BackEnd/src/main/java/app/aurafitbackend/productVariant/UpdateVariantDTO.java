package app.aurafitbackend.productVariant;

import app.aurafitbackend.color.Color;
import app.aurafitbackend.material.Material;
import app.aurafitbackend.product.Product;
import app.aurafitbackend.size.Size;
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
