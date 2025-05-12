package app.aurafitbackend.DTOS;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Enums.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostReviewRequestDTO {

    private String content;
    private Rating rating;
    private Product product;

}
