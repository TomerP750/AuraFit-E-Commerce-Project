import "./OrderCard.css";
import {OrderResponseDTO} from "../../../Models/DTOS/OrderResponseDTO.ts";
import {JSX} from "react";

interface OrderCardProps {
    order: OrderResponseDTO;
}
export function OrderCard({order}: OrderCardProps): JSX.Element {
    return (
        <div className="w-1/3 text-black">
			<p>{order.orderNumber}</p>
        </div>
    );
}
