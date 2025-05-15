import "./Buttons.css";
import {BiHeart} from "react-icons/bi";
import {AiFillHeart} from "react-icons/ai";
import {JSX, useState} from "react";

interface ButtonProps {
    onAddToCart?: () => void;
    onWishlist: () => void;
    isWishlisted: boolean;
    disabled: boolean;
}

export function Buttons({onAddToCart, onWishlist, isWishlisted, disabled}: ButtonProps): JSX.Element {

    const [wishlistHovered, setWishlistHovered] = useState<boolean>(false);

    return (
        <div className="w-full flex justify-between items-center">
            <button
                type={"button"}
                disabled={disabled}
                onClick={onAddToCart}
                    className={"disabled:bg-black/50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-700 transition duration-200 bg-black w-9/10 text-white py-3 rounded-lg"}>Add
                To Cart
            </button>
            <button
                type={"button"}
                onClick={onWishlist}
                onMouseEnter={() => setWishlistHovered(true)}
                onMouseLeave={() => setWishlistHovered(false)}
                className="cursor-pointer"
            >
                {(wishlistHovered || isWishlisted) ? <AiFillHeart className="size-6"/> : <BiHeart className="size-6"/>}
            </button>
        </div>
    );
}
