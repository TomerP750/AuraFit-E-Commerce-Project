import "./OrderSuccessfulPage.css";
import {JSX} from "react";
import {useLocation} from "react-router-dom";
import {OrderResponseDTO} from "../../../Models/DTOS/OrderResponseDTO.ts";
import {OrderItemCard} from "../OrderItemCard/OrderItemCard.tsx";

export function OrderSuccessfulPage(): JSX.Element {

    const location = useLocation();
    const {order} = location.state as { order: OrderResponseDTO }

    console.log(order)

    return (
        <div className="flex justify-center items-center w-full min-h-screen py-5">
            <div className="flex justify-center items-start w-3/4">
                {/*Left section - image*/}
                <div className="bg-yellow-200 flex-1 h-[800px]">

                </div>
                {/*right section*/}
                <div className="w-1/2 flex flex-col items-start px-8 mt-20 gap-10">
                    {/*Top*/}
                    <div className="space-y-15">
                        <div>
                            <p className={"text-purple-500"}>Payment Successful</p>
                            <p className="text-5xl font-bold">Thank You For Your Purchase</p>
                            <p className={"text-lg text-gray-500"}>We appreciate your order, we're currently processing
                                it.
                                and will send you confirmation
                                soon</p>
                        </div>
                        <div className="flex flex-col">
                            <p className={"font-medium"}>Order number</p>
                            <p className={"text-purple-600"}>{order.orderNumber}</p>
                        </div>
                    </div>

                    <hr className={"text-gray-400 font-medium w-full"} />
                {/*    Middle*/}
                    {order.orderItems.map(oi => <OrderItemCard key={oi.id} page={"success"} orderItem={oi}/>)}

                    <div className={"grid grid-cols-2"}>
                        <ul className={"flex flex-col items-start"}>
                            <li><p>Shipping Address</p></li>
                            <div>
                                <li><p>{order.contactInformation.firstName} {order.contactInformation.lastName}</p></li>
                                <li><p>{order.contactInformation.postalCode} {order.contactInformation.street}</p></li>
                                <li><p>{order.contactInformation.city}</p></li>
                            </div>
                        </ul>
                        <ul className={"flex flex-col items-start"}>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
