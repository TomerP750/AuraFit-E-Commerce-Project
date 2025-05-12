package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.DTOS.PostReviewRequestDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@AllArgsConstructor
public class ReviewValidator {
    public static boolean isValidReview(PostReviewRequestDTO review) {
        LocalDateTime now = LocalDateTime.now();
        if (review.getContent().isEmpty()) {
            return false;
        }
//        if (review.getReviewDate().isAfter(now)) {
//            return false;
//        }
        return true;
    }
}
