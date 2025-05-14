import "./OrderHistoryPage.css";
import {JSX, useEffect, useState} from "react";
import {useUserSelector} from "../../../Redux/hooks.ts";
import {OrderResponseDTO} from "../../../Models/DTOS/OrderResponseDTO.ts";
import orderService from "../../../Services/OrderService.ts";
import {toast} from "react-toastify";
import {OrderItemCard} from "../OrderItemCard/OrderItemCard.tsx";
import {OrderCard} from "../OrderCard/OrderCard.tsx";

export function OrderHistoryPage(): JSX.Element {

    const user = useUserSelector(state => state.authSlice.user);

    const [orders, setOrders] = useState<OrderResponseDTO[]>([]);

    useEffect(() => {
        orderService.userOrderHistory()
            .then(res => setOrders(res))
            .catch(res => toast.error(res.message));
    }, [])
    
    if (!orders) {
        return <span></span>;
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center ">
            <div className="w-9/10 border border-black flex flex-col items-center">
                {orders.map(order=> <OrderCard key={order.id} order={order}/>)}
            </div>
			
        </div>
    );
}
