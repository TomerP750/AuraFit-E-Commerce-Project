// src/components/ProductPage-Area/StarRating/StarRating.tsx
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export type StarRatingProps = {
    rating: number;
    onRatingChange?: (r: number) => void;
    editable?: boolean;
    size?: number;
};

export function StarRating({
                               rating,
                               onRatingChange,
                               editable = false,
                               size = 20,
                           }: StarRatingProps) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => {
                const idx = i + 1;
                const filled = editable
                    ? (hover ? idx <= hover : idx <= rating)
                    : idx <= rating;

                return (
                    <FaStar
                        key={i}
                        size={size}
                        className={filled ? "text-yellow-500" : "text-gray-400"}
                        style={editable ? { cursor: "pointer" } : undefined}
                        onMouseEnter={editable ? () => setHover(idx) : undefined}
                        onMouseLeave={editable ? () => setHover(0) : undefined}
                        onClick={
                            editable && onRatingChange ? () => onRatingChange(idx) : undefined
                        }
                    />
                );
            })}
        </div>
    );
}
