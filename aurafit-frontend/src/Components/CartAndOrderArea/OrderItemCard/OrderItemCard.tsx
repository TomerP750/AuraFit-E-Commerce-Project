import "./OrderItemCard.css";
import {JSX} from "react";
import {OrderItemDTO} from "../../../Models/OrderItemDTO.ts";
import {NavLink} from "react-router-dom";
import {OrderResponseDTO} from "../../../Models/DTOS/OrderResponseDTO.ts";


interface OrderItemCardProps {
    orderItem: OrderItemDTO;
    page?: string;
}

export function OrderItemCard({orderItem, page}: OrderItemCardProps): JSX.Element {

    if (page === "success") {
        return (
            <>
                <div className="w-full flex justify-between h-[150px] gap-5">
                    {/*    Left section - image*/}
                    <div className="w-1/2 aspect-square bg-gray-200 aspect-square"/>
                    {/*    Right section*/}
                    <div className="flex flex-col w-full gap-2 h-full">
                        <div className="flex justify-between font-medium">
                            <p>{orderItem.variant.product.name}</p>
                            <p>${orderItem.variant.onSale ? orderItem.variant.salePrice : orderItem.variant.basePrice}</p>
                        </div>
                        <div>
                            <p>Size: {orderItem.variant.size.size}</p>
                            <p>Color: {orderItem.variant.color.color}</p>
                            <p>Qty: {orderItem.quantity}</p>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 w-full" />

            </>
        )
    }


    return (
        <>
            <div className="w-full flex justify-between h-[150px] gap-5 px-8">
                {/*    Left section - image*/}
                <div className="w-1/5 aspect-ratio bg-gray-200 aspect-square"/>
                {/*    Right section*/}
                <div className="flex flex-col w-full gap-2 h-full">
                    <div className="flex justify-between font-medium">
                        <p>{orderItem.variant.product.name}</p>
                        <p>${orderItem.variant.onSale ? orderItem.variant.salePrice : orderItem.variant.basePrice}</p>
                    </div>
                    <div>
                        <p>Size: {orderItem.variant.size.size}</p>
                        <p>Color: {orderItem.variant.color.color}</p>
                        <p>Qty: {orderItem.quantity}</p>
                    </div>
                </div>
            </div>
            <div className="flex self-end px-8 gap-6 font-medium text-violet-500">
                <NavLink to={`/product/${orderItem.variant.product.id}`}
                         className={"cursor-pointer hover:text-violet-300"}>View Product</NavLink>
                <p className={"text-gray-300 font-light"}>|</p>
                <button className={"cursor-pointer hover:text-violet-400"}>Buy Again</button>
            </div>

            <hr className="border-gray-200"/>

        </>
    )
}
