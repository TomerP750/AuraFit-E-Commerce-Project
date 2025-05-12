import { Review } from "../Models/Review";
import axios from "axios";


class ReviewService {
    async postReview(review: Review) {
        return (await axios.post("http://localhost:8080/api/review/post", review))
    }
}

const reviewService = new ReviewService();
export default reviewService;