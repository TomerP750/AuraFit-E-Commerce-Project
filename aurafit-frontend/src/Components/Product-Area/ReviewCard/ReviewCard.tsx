import "./ReviewCard.css";
import {JSX} from "react";
import {Review} from "../../../Models/Review.ts";
import {FaStar} from "react-icons/fa";

interface ReviewCardProps {
    review: Review
}

export function ReviewCard({review}: ReviewCardProps): JSX.Element {
    return (
        <div className="w-full flex flex-col items-start flex-1 gap-5">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <p>{review.user.firstName}</p>
                    <p>{review.user.lastName}</p>
                </div>

                {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                        key={i}
                        className={i < review.rating ? "text-yellow-500" : "text-gray-400"}
                    />
                ))}
            </div>

            <p>{review.content}</p>
        </div>
    );
}
