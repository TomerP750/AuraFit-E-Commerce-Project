import "./CartItemCard.css";
import {JSX} from "react";
import {BiMinus, BiPlus, BiX} from "react-icons/bi";
import {CartItemDTO} from "../../../Models/DTOS/CartItemDTO.ts";


interface CartItemCardProps {
    cartItem: CartItemDTO;
    onDelete: () => void
    onAddToCart: () => void;
}

export function CartItemCard({cartItem, onDelete, onAddToCart}: CartItemCardProps): JSX.Element {


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
                                <button onClick={onAddToCart} className={"hover:text-black cursor-pointer"}><BiPlus size={20}/></button>
                                <button className={"hover:text-black cursor-pointer"}><BiMinus size={20}/></button>
                            </div>
                        </div>

                    </div>


                </div>

                {/* Bottom divider on small screens */}
                <hr className="block sm:hidden mt-4 border-gray-300"/>
            </div>
        </div>
    );
}
