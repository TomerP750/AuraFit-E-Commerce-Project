package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Review;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@AllArgsConstructor
public class ReviewValidator {
    public static boolean isValidReview(Review review) {
        LocalDateTime now = LocalDateTime.now();
        if (review.getContent().isEmpty()) {
            return false;
        }
        if (review.getReviewDate().isAfter(now)) {
            return false;
        }
        return true;
    }
}
