package app.aurafitbackend.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateReviewDTO {

    private Long id;
    private String content;
    private Integer rating;
}
