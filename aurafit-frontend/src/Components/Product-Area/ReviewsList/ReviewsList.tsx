import "./ReviewsList.css";
import {FaStar} from "react-icons/fa";
import {JSX} from "react";
import {Product} from "../../../Models/Product.ts";


interface ReviewsListProps {
    product: Product;
}
export function ReviewsList({product}: ReviewsListProps): JSX.Element {
    return (
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
    );
}
