import "./OrderItemCard.css";
import {JSX} from "react";
import {CartItemDTO} from "../../../Models/DTOS/CartItemDTO.ts";


interface OrderItemCardProps {
    cartItem: CartItemDTO;
}
export function OrderItemCard({cartItem}: OrderItemCardProps): JSX.Element {
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
    );
}
