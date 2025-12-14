package app.aurafitbackend.promotion;

import app.aurafitbackend.productVariant.ProductVariant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePromotionDTO {
    private String name;
    private Integer discountPercent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private ProductVariant productVariant;
}
