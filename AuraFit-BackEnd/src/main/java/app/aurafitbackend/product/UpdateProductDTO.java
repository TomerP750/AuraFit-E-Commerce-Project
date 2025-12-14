package app.aurafitbackend.product;

import app.aurafitbackend.category.Category;
import app.aurafitbackend.Enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateProductDTO {

    private Long id;
    private String name;
    private String description;
    private Gender gender;
    private Category category;
    private ProductType productType;

}
