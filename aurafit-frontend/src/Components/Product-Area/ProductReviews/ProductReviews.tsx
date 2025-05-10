import "./ProductReviews.css";
import {JSX} from "react";
import {Product} from "../../../Models/Product.ts";
import {ReviewCard} from "../ReviewCard/ReviewCard.tsx";
import {FaStar} from "react-icons/fa";


interface ProductReviewsProps {
    product: Product;
}

export function ProductReviews({product}: ProductReviewsProps): JSX.Element {
    return (
        <div className="flex justify-center">
            <div className="w-9/10 flex flex-col md:flex-row justify-between items-start gap-20">
                {/*left section*/}
                <div className={"flex flex-col items-start gap-5 w-full md:w-1/3"}>
                    <p className={"font-bold text-3xl"}>Customer Reviews</p>
                    {/*statistic box*/}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                        </div>
                        <p>Based on 100 reviews</p>
                    </div>
                    <div className="h-[200px] border border-black w-full">
                    </div>
                    <div className={"flex flex-col gap-3"}>
                        <p className={"text-xl font-medium"}>Share your thoughts</p>
                        <p>if you've used this product, share your thoughts with other customers</p>
                        <button
                            className={"w-full border border-gray-500 py-3 cursor-pointer hover:bg-black hover:text-white transition duration-300 ease-in"}>Write
                            a review
                        </button>
                    </div>
                </div>
                {/*right section*/}
                <div className={"flex flex-col w-full"}>
                    {/*{product.reviews.length > 0 */}
                    {/*    ? product.reviews.map(review => <ReviewCard review={review} key={review.id}/>) */}
                    {/*    : <span>Loading...</span>}*/}
                    <ReviewCard/>
                </div>
            </div>
        </div>
    );
}
