import "./Hero.css";
import {JSX} from "react";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";


export function Hero(): JSX.Element {

    const arrowItem = "size-12 cursor-pointer"

    return (
        <div className="w-full border border-black">
			<div className="relative w-full h-128 bg-black">
                <div className="absolute flex justify-between w-full text-white h-full items-center">
                    <FiArrowLeft className={`${arrowItem}`}/>
                    <FiArrowRight className={`${arrowItem}`} />
                </div>
            </div>
        </div>
    );
}
