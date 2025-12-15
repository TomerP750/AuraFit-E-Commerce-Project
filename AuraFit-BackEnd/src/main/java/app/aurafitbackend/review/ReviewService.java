package app.aurafitbackend.review;

import app.aurafitbackend.user.User;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.UnauthorizedException;
import app.aurafitbackend.user.UserRepository;
import app.aurafitbackend.Utils.ReviewValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;


    public void postReview(Long userId, PostReviewRequestDTO review) {
        if (ReviewValidator.isValidReview(review)) {
            Review newReview = Review.builder()
                    .content(review.getContent())
                    .rating(review.getRating())
                    .product(review.getProduct())
                    .build();
            User user = userRepository.findById(userId).orElseThrow(() -> new NotExistsException("User not found"));
            newReview.setUser(user);
            reviewRepository.save(newReview);
        }
    }

    public void updateReview(UpdateReviewDTO updatedReview) {
        Review review = reviewRepository.findById(updatedReview.getId()).orElseThrow(() -> new NotExistsException("Review not found"));
        if (ReviewValidator.isValidContent(updatedReview)) {
            review.setContent(updatedReview.getContent());
            review.setRating(updatedReview.getRating());
            reviewRepository.save(review);
        }
    }

    public void deleteReview(Long userId ,Long reviewId) {
        User user = userRepository.findById(userId).orElseThrow(()->new NotExistsException("User not found"));
        Review review = reviewRepository.findById(reviewId).orElseThrow(()->new NotExistsException("Review not found"));
        if (!review.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Youre not allowed to delete this review");
        }
        reviewRepository.deleteById(reviewId);
    }






}
