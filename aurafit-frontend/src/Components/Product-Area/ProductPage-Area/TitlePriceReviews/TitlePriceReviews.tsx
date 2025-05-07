import "./TitlePriceReviews.css";
import {FaStar} from "react-icons/fa";
import {JSX} from "react";

export function TitlePriceReviews(): JSX.Element {
    return (
        <div className="w-full flex justify-between flex-col gap-1">
            <div className="flex justify-between">
                <p className="text-3xl">Basic Tee</p>
                <p className={"text-3xl"}>$35</p>
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
