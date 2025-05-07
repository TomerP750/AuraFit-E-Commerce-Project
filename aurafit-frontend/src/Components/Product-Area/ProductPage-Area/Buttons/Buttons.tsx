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

    const [wishlistHovered, setWishlistHovered] = useState<boolean>(false);

    return (
        <div className="w-full flex justify-between items-center">
            <button onClick={onAddToCartClick}
                    className={"cursor-pointer hover:bg-gray-700 transition duration-200 bg-black w-9/10 text-white py-3 rounded-lg"}>Add
                To Cart
            </button>
            {/*<button*/}
            {/*    onClick={onWishlistClick}*/}
            {/*    className={"cursor-pointer"}>{!isWishlisted ? <BiHeart className={"size-6 cursor-pointer"}/> :*/}
            {/*    <AiFillHeart className={"size-6 cursor-pointer"}/>}*/}
            {/*</button>*/}
            <button
                onClick={onWishlistClick}
                onMouseEnter={() => setWishlistHovered(true)}
                onMouseLeave={() => setWishlistHovered(false)}
                className="cursor-pointer"
            >
                {(wishlistHovered || isWishlisted) ? <AiFillHeart className="size-6"/> : <BiHeart className="size-6"/>}
            </button>
        </div>
    );
}
