package app.aurafitbackend.Utils;

import app.aurafitbackend.review.PostReviewRequestDTO;
import app.aurafitbackend.review.UpdateReviewDTO;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.Repositories.ReviewRepository;

import java.time.LocalDateTime;


public class ReviewValidator {


    private static ReviewRepository reviewRepository;
    private ReviewValidator(ReviewRepository reviewRepository) {
        ReviewValidator.reviewRepository = reviewRepository;
    }

    public static boolean isValidReview(PostReviewRequestDTO review) {
        LocalDateTime now = LocalDateTime.now();
        if (review.getContent().isEmpty()) {
            return false;
        }
        if (review.getRating() <= 0 || review.getRating() > 5) {
            throw new InvalidInputException("Rating should be between 1 and 5");
        }
//        if (review.getReviewDate().isAfter(now)) {
//            return false;
//        }
        return true;
    }

    public static boolean isValidContent(UpdateReviewDTO updatedReview) {
        if (updatedReview.getContent().isEmpty()) {
            throw new InvalidInputException("Content should not be empty");
        }
        return true;
    }
}
