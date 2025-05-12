import "./TitlePriceReviews.css";
import {FaStar} from "react-icons/fa";
import {JSX, useEffect, useState} from "react";
import {ProductVariant} from "../../../../Models/ProductVariant.ts";
import displayService from "../../../../Services/DisplayService.ts";
import {toast} from "react-toastify";


interface TitlePriceReviewsProps {
    variant: ProductVariant;
}
export function TitlePriceReviews({variant}: TitlePriceReviewsProps): JSX.Element {

    const [productAvg, setProductAvg] = useState<number>(3);

    useEffect(() => {
        displayService.getProductReviewAvg(variant.product.id)
            .then(res => setProductAvg(res))
            .catch(err => toast.error(err));
    }, [])

    return (
        <div className="w-full flex justify-between flex-col gap-1">
            <div className="flex justify-between">
                <p className="text-3xl">{variant.product.name}</p>
                <p className={"text-3xl"}>${variant.onSale ? variant.salePrice : variant.basePrice}</p>
            </div>

            {/*    Reviews*/}
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                            key={i}
                            className={i < productAvg ? "text-yellow-500" : "text-gray-400"}
                        />
                    ))}
                    {variant.product.reviews.length === 0 ? <p className={"ml-4 cursor-pointer hover:underline"}>No Reviews</p>
                        : <p className={"ml-4 cursor-pointer hover:underline"}>See
                            all {variant.product.reviews.length} reviews</p>}
                </div>
            </div>
        </div>
    );
}
