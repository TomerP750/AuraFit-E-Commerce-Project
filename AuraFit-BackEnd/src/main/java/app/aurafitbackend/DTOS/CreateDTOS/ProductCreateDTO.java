package app.aurafitbackend.DTOS.CreateDTOS;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Beans.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreateDTO {

    private String description;


    private Category category;

    private SubCategory subCategory;

    private List<ProductVariantCreateDto> variants;
}
