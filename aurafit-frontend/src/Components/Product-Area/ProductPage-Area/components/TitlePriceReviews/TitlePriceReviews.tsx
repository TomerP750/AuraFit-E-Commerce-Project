import "./TitlePriceReviews.css";
import {FaStar} from "react-icons/fa";
import {JSX, useEffect, useState} from "react";
import {ProductVariant} from "../../../../../Models/ProductVariant.ts";
import displayService from "../../../../../Services/DisplayService.ts";
import {toast} from "react-toastify";


interface TitlePriceReviewsProps {
    variant: ProductVariant;
}
export function TitlePriceReviews({variant}: TitlePriceReviewsProps): JSX.Element {

    const reviews = variant.product.reviews ?? [];
    const reviewCount = reviews.length;

    // hard-code a default avg, or compute from the reviews array:
    // const productAvg = 3; // ← if you really want it always 3
    const productAvg =
        reviewCount > 0
            ? Math.round(
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
            )
            : 0;

    return (
        <div className="w-full flex flex-col gap-2">
            {/* Title & Price */}
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">{variant.product.name}</p>
                <p className="text-2xl font-semibold">
                    ${variant.onSale ? variant.salePrice : variant.basePrice}
                </p>
            </div>

            {/* Stars & link */}
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                        key={i}
                        className={`text-md ${i < productAvg ? "text-yellow-500" : "text-gray-400"}`}
                    />
                ))}

                {reviewCount === 0 ? (
                    <p className="ml-4 text-sm text-gray-600 cursor-pointer hover:underline">
                        No Reviews
                    </p>
                ) : (
                    <p className="ml-4 text-sm text-gray-600 cursor-pointer hover:underline">
                        See all {reviewCount} review{reviewCount > 1 ? "s" : ""}
                    </p>
                )}
            </div>
        </div>
    );
}
