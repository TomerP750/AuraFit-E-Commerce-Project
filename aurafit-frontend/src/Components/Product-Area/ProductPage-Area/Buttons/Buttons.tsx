import "./Buttons.css";
import {BiHeart} from "react-icons/bi";
import {AiFillHeart} from "react-icons/ai";
import {JSX, useState} from "react";

interface ButtonProps {
    onAddToCartClick?: () => void;
    onWishlistClick: () => void;
    isWishlisted: boolean;
}

export function Buttons({onAddToCartClick, onWishlistClick, isWishlisted}: ButtonProps): JSX.Element {

    return (
        <div className="w-full flex justify-between items-center">
            <button onClick={onAddToCartClick} className={"bg-black w-9/10 text-white py-3 rounded-lg"}>Add To Cart</button>
            <button
                onClick={onWishlistClick}
                className={"cursor-pointer"}>{!isWishlisted ? <BiHeart className={"size-6"}/> :
                <AiFillHeart className={"size-6"}/>}
            </button>
        </div>
    );
}
