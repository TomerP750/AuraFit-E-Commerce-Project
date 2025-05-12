import "./ProductReviews.css";
import {JSX, useState} from "react";
import {Product} from "../../../Models/Product.ts";
import {ReviewCard} from "../ReviewCard/ReviewCard.tsx";
import {FaStar} from "react-icons/fa";
import {ReviewsList} from "../ReviewsList/ReviewsList.tsx";
import {Review} from "../../../Models/Review.ts";
import reviewService from "../../../Services/ReviewService.ts";
import {useUserSelector} from "../../../Redux/hooks.ts";
import {PostReviewForm} from "../PostReviewForm/PostReviewForm.tsx";
import adminService from "../../../Services/AdminService.ts";


interface ProductReviewsProps {
    product: Product;
}

export function ProductReviews({product}: ProductReviewsProps): JSX.Element {

    const [reviewPostOpen, setReviewPostOpen] = useState(false);
    const user = useUserSelector((state) => state.authSlice.user);



    return (
        <div className="min-h-screen flex justify-center w-full">
            <div className="w-9/10 flex flex-col md:flex-row justify-between items-start gap-20">
                {/*left section*/}
                <ReviewsList onPostClick={()=>setReviewPostOpen(true)} product={product} />
                {/*right section*/}
                <div className={"flex flex-col w-full gap-30"}>
                    {/*{product.reviews.length === 0 ? <span>No Reviews Yet</span>*/}
                    {/*    : product.reviews.map(review => <ReviewCard review={review} key={review.id}/>)}*/}
                    <PostReviewForm />

                </div>
            </div>
        </div>
    );
}
