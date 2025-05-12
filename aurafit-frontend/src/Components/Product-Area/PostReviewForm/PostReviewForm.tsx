// PostReviewForm.tsx
import {JSX, useState} from "react";
import {FaStar} from "react-icons/fa";
import {Rating} from "../../../Models/Enums/Rating.ts";

interface PostReviewFormProps {
    onCancel?: () => void;
}

export function PostReviewForm({onCancel}: PostReviewFormProps): JSX.Element {
    const [rating, setRating] = useState<Rating>(null);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [text, setText] = useState<string>("");

    const handleSubmit = () => {

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full border p-4 rounded shadow space-y-4"
        >
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => {
                    const starIndex = i + 1;
                    const fill = hoverRating ? starIndex <= hoverRating : starIndex <= rating;
                    return (
                        <FaStar
                            key={i}
                            size={24}
                            className={fill ? "text-yellow-500" : "text-gray-400"}
                            onMouseEnter={() => setHoverRating(starIndex)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(starIndex)}
                            style={{ cursor: "pointer" }}
                        />
                    );
                })}
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="Write your review here..."
                className="w-full border-b rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

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
                    disabled={!rating}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
