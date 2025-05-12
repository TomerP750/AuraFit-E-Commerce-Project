// PostReviewForm.tsx
import { JSX, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Rating } from "../../../Models/Enums/Rating.ts";
import { PostReviewRequestDTO } from "../../../Models/DTOS/PostReviewRequestDTO.ts";
import reviewService from "../../../Services/ReviewService.ts";
import { Product } from "../../../Models/Product.ts";
import { toast } from "react-toastify";

interface PostReviewFormProps {
    product: Product;
    onCancel?: () => void;
}

export function PostReviewForm({ product, onCancel }: PostReviewFormProps): JSX.Element {

    const [rating, setRating] = useState<number>(5);

    const [hoverRating, setHoverRating] = useState<number>(0);

    const [text, setText] = useState<string>("");



    // Handler for form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create DTO and post
        const reviewDto = new PostReviewRequestDTO(text, rating, product);
        console.log(reviewDto);
        reviewService
            .postReview(reviewDto)
            .then(() => {
                toast.success("Review has been submitted!");
                // Reset form
                setRating(0);
                setHoverRating(0);
                setText("");
                if (onCancel) onCancel();
            })
            .catch(err => {
                console.error("Error posting review:", err);
                toast.error(err.response?.data || err.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full border p-4 rounded shadow space-y-4">
            {/* Star Rating Input */}
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => {
                    const starIndex = i + 1;
                    const fill = hoverRating
                        ? starIndex <= hoverRating
                        : starIndex <= rating;
                    return (
                        <FaStar
                            key={i}
                            size={24}
                            className={fill ? "text-yellow-500" : "text-gray-400"}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHoverRating(starIndex)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(starIndex)}
                        />
                    );
                })}
            </div>

            {/* Review Textarea */}
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={6}
                placeholder="Write your review here..."
                className="w-full border-b rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={rating === 0}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
