import { Review } from "../Models/Review";
import axios from "axios";
import {PostReviewRequestDTO} from "../Models/DTOS/PostReviewRequestDTO.ts";
import {UpdateReviewDTO} from "../Models/DTOS/UpdateReviewDTO.ts";


class ReviewService {
    async postReview(review: PostReviewRequestDTO) {
        return (await axios.post("http://localhost:8080/api/review/post", review))
    }

    async deleteReview(id: number) {
        return (await axios.delete(`http://localhost:8080/api/review/delete/${id}`))
    }

    async updateReview(updatedReview: UpdateReviewDTO) {
        return (await axios.put(`http://localhost:8080/api/review/update`, updatedReview))
    }
}

const reviewService = new ReviewService();
export default reviewService;