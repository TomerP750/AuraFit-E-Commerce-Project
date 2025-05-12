import "./TitlePriceReviews.css";
import {FaStar} from "react-icons/fa";
import {JSX} from "react";
import {ProductVariant} from "../../../../Models/ProductVariant.ts";


interface TitlePriceReviewsProps {
    variant: ProductVariant;
}
export function TitlePriceReviews({variant}: TitlePriceReviewsProps): JSX.Element {
    return (
        <div className="w-full flex justify-between flex-col gap-1">
            <div className="flex justify-between">
                <p className="text-3xl">{variant.product.name}</p>
                <p className={"text-3xl"}>${variant.onSale ? variant.salePrice : variant.basePrice}</p>
            </div>

            {/*    Reviews*/}
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <p className={"ml-4 cursor-pointer hover:underline"}>See all 100 reviews</p>
                </div>
            </div>
        </div>
    );
}
