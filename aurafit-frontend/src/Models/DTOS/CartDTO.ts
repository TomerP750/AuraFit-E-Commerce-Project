import { CartItemDTO } from "./CartItemDTO";
import {Status} from "../Enums/Status.ts";


export class CartDTO {
    id: number;
    items: CartItemDTO[];
    shippingCost: number;
    totalCartPrice: number;
    subTotal: number;
    status: Status;
    userId: number | null;
    cartToken: string | null;

    constructor(id: number, items: CartItemDTO[], shippingCost: number, subTotal: number ,totalCartPrice: number, status: Status, userId: number, cartToken: string | null) {
        this.id = id;
        this.items = items;
        this.shippingCost = shippingCost;
        this.subTotal = subTotal;
        this.totalCartPrice = totalCartPrice;
        this.status = status;
        this.userId = userId;
        this.cartToken = cartToken;

    }
}