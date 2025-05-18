import "./CartItemCard.css";
import {JSX} from "react";
import {BiMinus, BiPlus, BiX} from "react-icons/bi";
import {CartItemDTO} from "../../../Models/DTOS/CartItemDTO.ts";
import {CartItem} from "../../../Models/CartItem.ts";


interface CartItemCardProps {
    cartItem: CartItem;
    onDelete?: () => void
    onAddToCart?: () => void;
    page?: string;
    onOneQuantityRemove?: () => void;
}

export function CartItemCard({page ,cartItem, onDelete, onAddToCart, onOneQuantityRemove}: CartItemCardProps): JSX.Element {

    if (page === "cartPage") {
    return (
        <div className="flex flex-col sm:flex-row w-full bg-white rounded-md shadow-sm overflow-hidden">
            {/* Image Placeholder */}
            <div className="w-full sm:w-1/3 md:w-1/4 aspect-square bg-gray-200 flex-shrink-0"/>

            {/* Details & Actions */}
            <div className="flex flex-col flex-1 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {/* Text Info */}
                    <div className="flex-1">
                        {/*Name and Delete button*/}
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-lg truncate">{cartItem.variant.product.name}</p>
                            <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                                <BiX size={25} onClick={onDelete}/>
                            </button>
                        </div>
                        {/*Cart Item information details*/}
                        <div className="flex flex-col justify-between items-start gap-2 text-sm text-gray-600 mt-1">
                            {/*Size and color*/}
                            <div className="flex gap-5">
                                <span>{cartItem.variant.size.size}</span>
                                <span className="text-gray-400 font-light">|</span>
                                <span>{cartItem.variant.color.color}</span>
                            </div>

                            <p>Qty: {cartItem.quantity}</p>
                            <p className="font-semibold text-md">${(cartItem.quantity * cartItem.unitPrice).toFixed(2)}</p>
                            <div className="flex gap-5 mt-10 text-gray-500">
                                <button onClick={onAddToCart} className={"hover:text-black cursor-pointer"}>
                                    <BiPlus size={20}/>
                                </button>

                                <button onClick={onOneQuantityRemove} className={"hover:text-black cursor-pointer"}>
                                    <BiMinus size={20}/>
                                </button>
                            </div>
                        </div>

                    </div>


                </div>

                {/* Bottom divider on small screens */}
                <hr className="block sm:hidden mt-4 border-gray-300"/>
            </div>
        </div>
    )}

    return (
        <div className="w-full">
            <div className="flex justify-between w-full items-center gap-4">
                {/* Left section: 100 px square black placeholder */}
                <div className="w-24 aspect-square bg-black flex-shrink-0" />

                {/* Right section */}
                <div className="flex flex-col items-start flex-1">
                    <p className="font-semibold text-lg">{cartItem.variant.product.name}</p>
                    <div className="flex gap-5 items-center text-sm text-gray-600">
                        <span>{cartItem.variant.size.size}</span>
                        <span>{cartItem.variant.color.color}</span>
                    </div>
                    <p className="mt-2">Qty: {cartItem.quantity}</p>
                    <p className="mt-1 font-medium">
                        ${cartItem.unitPrice * cartItem.quantity}
                    </p>
                </div>
            </div>
        </div>
    )

}
