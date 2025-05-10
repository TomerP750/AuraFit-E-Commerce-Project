import "./ReviewCard.css";
import {JSX} from "react";
import {Review} from "../../../Models/Review.ts";
import {BiStar} from "react-icons/bi";
import {FaStar} from "react-icons/fa";

interface ReviewCardProps {
    review: Review
}

export function ReviewCard(): JSX.Element {
    return (
        <div className="w-full flex flex-col items-start flex-1 gap-5">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <p>First name</p>
                    <p>last name</p>
                </div>

                {/*Rating starts*/}
                <div className="flex gap-1">
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias architecto cumque ea esse
                laborum mollitia natus nemo nisi pariatur perspiciatis qui quibusdam quo, similique sunt temporibus
                veniam. Tenetur, velit!</p>
        </div>
    );
}
