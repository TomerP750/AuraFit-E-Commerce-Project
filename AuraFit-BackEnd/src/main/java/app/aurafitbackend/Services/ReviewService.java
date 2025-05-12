package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.PostReviewRequestDTO;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.UnauthorizedException;
import app.aurafitbackend.Repositories.ReviewRepository;
import app.aurafitbackend.Repositories.UserRepository;
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

    public void updateReview() {

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
