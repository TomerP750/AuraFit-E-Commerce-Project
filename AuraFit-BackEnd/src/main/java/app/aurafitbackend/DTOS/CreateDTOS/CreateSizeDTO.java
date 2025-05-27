package app.aurafitbackend.DTOS.CreateDTOS;

import app.aurafitbackend.Beans.ProductType;
import app.aurafitbackend.Beans.Size;
import jakarta.annotation.security.DenyAll;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateSizeDTO {

    private String size;
    private ProductType productType;
}
