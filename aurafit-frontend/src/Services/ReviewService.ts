import { Review } from "../Models/Review";
import axios from "axios";
import {PostReviewRequestDTO} from "../Models/DTOS/PostReviewRequestDTO.ts";


class ReviewService {
    async postReview(review: PostReviewRequestDTO) {
        return (await axios.post("http://localhost:8080/api/review/post", review))
    }
}

const reviewService = new ReviewService();
export default reviewService;