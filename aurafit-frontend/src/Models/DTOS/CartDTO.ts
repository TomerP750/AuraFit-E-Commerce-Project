import { CartItemDTO } from "./CartItemDTO";
import {Status} from "../Enums/Status.ts";


export class CartDTO {
    id: number;
    items: CartItemDTO[];
    shippingCost: number;
    totalPrice: number;
    status: Status;
    userId: number | null;
    cartToken: string | null;

    constructor(id: number, items: CartItemDTO[], shippingCost: number, totalPrice: number, status: Status, userId: number, cartToken: string | null) {
        this.id = id;
        this.items = items;
        this.shippingCost = shippingCost;
        this.totalPrice = totalPrice;
        this.status = status;
        this.userId = userId;
        this.cartToken = cartToken;

    }
}