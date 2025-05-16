package app.aurafitbackend.DTOS;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Beans.ProductType;
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
