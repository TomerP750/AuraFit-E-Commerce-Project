import "./OrderItemCard.css";
import {JSX} from "react";
import {OrderItemDTO} from "../../../Models/OrderItemDTO.ts";
import {NavLink} from "react-router-dom";


interface OrderItemCardProps {
    orderItem: OrderItemDTO;
    page?: string;
}

export function OrderItemCard({orderItem, page}: OrderItemCardProps): JSX.Element {
    // if (page === "checkout"){
    // return (
    //     <div className="w-full">
    //         <div className="flex justify-between w-full items-center gap-4">
    //             {/* Left section: 100 px square black placeholder */}
    //             <div className="w-24 aspect-square bg-black flex-shrink-0" />
    //
    //             {/* Right section */}
    //             <div className="flex flex-col items-start flex-1">
    //                 <p className="font-semibold text-lg">{orderItem.variant.product.name}</p>
    //                 <div className="flex gap-5 items-center text-sm text-gray-600">
    //                     <span>{orderItem.variant.size.size}</span>
    //                     <span>{orderItem.variant.color.color}</span>
    //                 </div>
    //                 <p className="mt-2">Qty: {orderItem.quantity}</p>
    //                 <p className="mt-1 font-medium">
    //                     ${orderItem.unitPrice * orderItem.quantity}
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // )}

    return (
        <>
            <div className="w-full flex justify-between h-[150px] gap-5 px-8">
                {/*    Left section - image*/}
                <div className="w-1/5 aspect-ratio bg-yellow-200 aspect-square"/>
                {/*    Right section*/}
                <div className="flex flex-col w-full gap-2 h-full">
                    <div className="flex justify-between font-medium">
                        <p>{orderItem.variant.product.name}</p>
                        <p>${orderItem.variant.onSale ? orderItem.variant.salePrice : orderItem.variant.basePrice}</p>
                    </div>
                    <p>{orderItem.variant.product.description}</p>
                </div>
            </div>
            <div className="flex self-end px-8 gap-6 font-medium text-violet-500">
                <NavLink to={`/product/${orderItem.variant.product.id}`} className={"cursor-pointer hover:text-violet-300"}>View Product</NavLink>
                <p className={"text-gray-300 font-light"}>|</p>
                <button className={"cursor-pointer hover:text-violet-400"}>Buy Again</button>
            </div>
        </>
    )
}
