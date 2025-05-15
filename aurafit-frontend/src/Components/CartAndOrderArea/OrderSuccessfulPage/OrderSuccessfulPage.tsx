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
        <div className="min-h-screen flex justify-center items-center py-5 px-4 bg-gray-50">
            <div className="flex flex-col md:flex-row w-full md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">

                <div className="bg-yellow-200 w-full md:w-1/2 h-64 md:h-auto flex-shrink-0" />

                {/* Right section */}
                <div className="w-full md:w-1/2 p-8 flex flex-col gap-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <p className="text-purple-500">Payment Successful</p>
                        <p className="text-3xl md:text-5xl font-bold">Thank You For Your Purchase</p>
                        <p className="text-gray-500">
                            We appreciate your order, we're currently processing it and
                            will send you confirmation soon.
                        </p>
                    </div>

                    {/* Order number */}
                    <div className="space-y-1">
                        <p className="font-medium">Order number</p>
                        <p className="text-purple-600">{order.orderNumber}</p>
                    </div>

                    <hr className="border-gray-300" />

                    {/* Order items */}
                    <div className="space-y-4">
                        {order.orderItems.map((oi) => (
                            <OrderItemCard key={oi.id} page="success" orderItem={oi} />
                        ))}
                    </div>

                    {/* Address & summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium mb-1">Shipping Address</p>
                            <p>
                                {order.contactInformation.firstName}{" "}
                                {order.contactInformation.lastName}
                            </p>
                            <p>
                                {order.contactInformation.postalCode}{" "}
                                {order.contactInformation.street}
                            </p>
                            <p>{order.contactInformation.city}</p>
                        </div>
                        <div>
                            <p className="font-medium mb-1">Total Paid</p>
                            <p>${order.totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
