import "./ProductReviews.css";
import {JSX} from "react";
import {Product} from "../../../Models/Product.ts";
import {ReviewCard} from "../ReviewCard/ReviewCard.tsx";
import {FaStar} from "react-icons/fa";
import {ReviewsList} from "../ReviewsList/ReviewsList.tsx";


interface ProductReviewsProps {
    product: Product;
}

export function ProductReviews({product}: ProductReviewsProps): JSX.Element {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-9/10 flex flex-col md:flex-row justify-between items-start gap-20">
                {/*left section*/}
                <ReviewsList product={product} />
                {/*right section*/}
                <div className={"flex flex-col w-full gap-30"}>
                    {/*{product.reviews.map(review => <ReviewCard review={review} key={review.id}/>)}*/}
                    <ReviewCard/>
                    <ReviewCard/>
                </div>
            </div>
        </div>
    );
}
