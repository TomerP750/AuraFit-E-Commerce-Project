package app.aurafitbackend.review;

import app.aurafitbackend.Security.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
@AllArgsConstructor
public class ReviewController {

    private ReviewService reviewService;

    @PostMapping("/post")
    public void postReview(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody PostReviewRequestDTO review) {
        Long userId = userDetails.getUser().getId();
        reviewService.postReview(userId, review);
    }

    @PutMapping("/update")
    public void updateReview(@RequestBody UpdateReviewDTO review) {
        reviewService.updateReview(review);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReview(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id) {
        Long userId = userDetails.getUser().getId();
        reviewService.deleteReview(userId, id);
    }

}
