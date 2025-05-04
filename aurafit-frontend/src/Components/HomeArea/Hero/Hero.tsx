import "./Hero.css";
import {JSX} from "react";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import heroimage1 from "../../../assets/heroImage1.png"


export function Hero(): JSX.Element {

    const arrowItem = "size-12 cursor-pointer"

    return (
        <div className="w-full border border-black">
			<div className="relative w-full h-128 bg-black">
                <img src={heroimage1} alt="image" className={'w-full h-128 object-cover'}/>
                <div className="absolute inset-0 flex justify-between items-center px-4 text-white">
                    <FiArrowLeft className={arrowItem}/>
                    <FiArrowRight className={arrowItem}/>
                </div>
            </div>
        </div>
    );
}
