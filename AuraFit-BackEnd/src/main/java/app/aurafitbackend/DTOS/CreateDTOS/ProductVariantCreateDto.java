package app.aurafitbackend.DTOS.CreateDTOS;

import app.aurafitbackend.Beans.Color;
import app.aurafitbackend.Beans.Material;
import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantCreateDto {

    private Size size;

    private Color color;


    private Set<Material> materials;

    private BigDecimal basePrice;
    private BigDecimal salePrice;

    private Integer stockQuantity;

    private Product product;
}
