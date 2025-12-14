package app.aurafitbackend.product;

import app.aurafitbackend.category.Category;
import app.aurafitbackend.Enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreateDTO {

    private String name;
    private String description;
    private Gender gender;
    private Category category;
    private ProductType productType;

}
