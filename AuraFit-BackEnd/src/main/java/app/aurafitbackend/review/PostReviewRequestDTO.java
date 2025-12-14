package app.aurafitbackend.review;

import app.aurafitbackend.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostReviewRequestDTO {

    private String content;
    private Integer rating;
    private Product product;

}
