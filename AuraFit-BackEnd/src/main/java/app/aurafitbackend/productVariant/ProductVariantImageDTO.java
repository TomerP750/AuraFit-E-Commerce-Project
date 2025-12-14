package app.aurafitbackend.productVariant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class ProductVariantImageDTO {
    private Long id;
    private String imageUrl;
}
