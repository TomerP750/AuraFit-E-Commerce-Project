package app.aurafitbackend.DTOS.CreateDTOS;

import app.aurafitbackend.Beans.Size;
import app.aurafitbackend.Enums.Color;
import app.aurafitbackend.Enums.Material;
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

    private BigDecimal price;

    private Integer stockQuantity;
}
