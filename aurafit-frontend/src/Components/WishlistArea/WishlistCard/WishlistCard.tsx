import "./WishlistCard.css";
import {WishlistItem} from "../../../Models/WishlistItem.ts";
import {JSX, useState} from "react";
import {toast} from "react-toastify";
import {AddToCartRequestDTO} from "../../../Models/DTOS/AddToCartRequestDTO.ts";
import cartService from "../../../Services/CartService.ts";
import {useNavigate} from "react-router-dom";
import wishlistService from "../../../Services/WishlistService.ts";


interface WishlistCardProps {
    wishlistItem: WishlistItem;
    onAddToCart: () => void;
}
export function WishlistCard({wishlistItem}: WishlistCardProps): JSX.Element {

    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const handleWishlistAddToCart = ()=> {
        // const dto = new AddToCartRequestDTO(variantId, 1);
        // cartService.addToCart(dto)
        //     .then(() => {
        //         toast.success("Added to cart")
        //         return wishlistService.deleteProductFromWishlist(wishlistItem.id);
        //     })
        //     .catch((err) => toast.error(err.response?.data || "Error"));
    }

    return (
        <div className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden">
            {/* Top: square placeholder with hover buttons */}
            <div
                className="relative w-full aspect-square bg-gray-200"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {/* Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Placeholder
                </div>

                {/* Hover overlay */}
                {hover && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate(`/product/${wishlistItem.product.id}`)}
                            className="px-3 py-1 bg-white rounded text-sm font-medium hover:bg-gray-100 transition"
                        >
                            Go To Product
                        </button>
                        <button
                            type="button"
                            onClick={handleWishlistAddToCart}
                            className="px-3 py-1 bg-white rounded text-sm font-medium hover:bg-gray-100 transition"
                        >
                            Add To Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom: details under the image */}
            <div className="p-4 flex flex-col gap-2">
                <p className="font-semibold text-lg truncate">{wishlistItem.product.name}</p>
                {/*<p className="text-gray-600 text-sm">*/}
                {/*    {wishlistItem.product.size.size} <span className="mx-1">|</span> {wishlistItem.product.color.color}*/}
                {/*</p>*/}
                {/*<p className="font-medium mt-2">${wishlistItem.product.price.toFixed(2)}</p>*/}
            </div>
        </div>
    );
}
