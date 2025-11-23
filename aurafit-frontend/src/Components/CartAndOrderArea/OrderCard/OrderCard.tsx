import "./OrderCard.css";
import {OrderResponseDTO} from "../../../Models/DTOS/OrderResponseDTO.ts";
import {JSX} from "react";
import {OrderItemCard} from "../OrderItemCard/OrderItemCard.tsx";

interface OrderCardProps {
    order: OrderResponseDTO;
}

export function OrderCard({order}: OrderCardProps): JSX.Element {
    return (
        <div className="flex flex-col w-4/5 text-black shadow shadow-gray-300 gap-5 py-5">

            {/*Top*/}

            <div className="flex justify-between items-center px-8">
                <div className="flex gap-10 lg:gap-20 flex-wrap">
                    <div className="flex flex-col">
                        <p className={"font-medium"}>Order number</p>
                        <p className={"text-gray-500 font-light"}>{order.orderNumber}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className={"font-medium"}>Date placed</p>
                        <p className={"text-gray-500 font-light"}>{order.orderDate.toString()}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className={"font-medium"}>Total amount</p>
                        <p className={"font-medium"}>${order.totalPrice}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className={"font-medium"}>Status</p>
                        <p className={"font-medium"}>{order.status}</p>
                    </div>
                </div>
            </div>

            <hr className="border-gray-400"/>

            {/*    Bottom */}
            {order.orderItems.map(item => <OrderItemCard key={item.id} orderItem={item} page={"history"}/>)}

        </div>
    );
}
