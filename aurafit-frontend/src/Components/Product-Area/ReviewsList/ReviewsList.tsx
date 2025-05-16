import "./ReviewsList.css";
import {FaStar} from "react-icons/fa";
import {JSX, useEffect, useState} from "react";
import {Product} from "../../../Models/Product.ts";
import displayService from "../../../Services/DisplayService.ts";
import {toast} from "react-toastify";
import {Review} from "../../../Models/Review.ts";
import reviewService from "../../../Services/ReviewService.ts";
import {useUserSelector} from "../../../Redux/hooks.ts";


interface ReviewsListProps {
    product: Product;
    onPostClick: () => void;
}
export function ReviewsList({product, onPostClick}: ReviewsListProps): JSX.Element {

    const [avg, setAvg] = useState<number>(0);
    const user = useUserSelector(state => state.authSlice.user);

    useEffect(() => {
        displayService.getProductReviewAvg(product.id)
            .then(res => setAvg(res))
            .catch(err => toast.error(err));
    }, []);



    return (
        <div className={"flex flex-col items-start gap-5 w-full md:w-1/3"}>
            <p className={"font-bold text-3xl"}>Customer Reviews</p>
            {/*statistic box*/}
            <div className="flex flex-col items-start gap-2">
                <div className="flex gap-2 items-center">
                    <p className={"text-2xl"}>{avg}</p>
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                            key={i}
                            size={30}
                            className={i < avg ? "text-yellow-500" : "text-gray-400"}
                        />
                    ))}
                </div>
                <p className={"text-gray-600"}>Based on {product.reviews.length} reviews</p>
            </div>
            {/*<div className="h-[200px] border border-black w-full">*/}
            {/*</div>*/}
            <div className={"flex flex-col gap-3"}>
                <p className={"text-xl font-medium"}>Share your thoughts</p>
                <p>if you've used this product, share your thoughts with other customers</p>
                {user === null
                    ? <button disabled={true} className={"py-3 border border-black cursor-not-allowed"}>Login To Review</button>
                    : <button
                    onClick={onPostClick}
                    className={"w-full border border-gray-500 py-3 cursor-pointer hover:bg-black hover:text-white transition duration-300 ease-in"}>Write
                    a review
                </button>}

            </div>
        </div>
    );
}
