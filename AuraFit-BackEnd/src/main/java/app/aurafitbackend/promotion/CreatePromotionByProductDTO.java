package app.aurafitbackend.promotion;

import app.aurafitbackend.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePromotionByProductDTO {

    private String name;
    private Integer discountPercent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Product product;
}
