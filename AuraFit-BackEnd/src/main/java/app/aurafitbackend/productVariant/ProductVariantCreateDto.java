package app.aurafitbackend.productVariant;

import app.aurafitbackend.color.Color;
import app.aurafitbackend.material.Material;
import app.aurafitbackend.product.Product;
import app.aurafitbackend.size.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantCreateDto {

    private Size size;

    private Color color;


    private Material material;

    private BigDecimal basePrice;
    private BigDecimal salePrice;

    private Integer stockQuantity;

    private Product product;
}
