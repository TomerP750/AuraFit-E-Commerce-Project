import {Status} from "./Enums/Status.ts";
import {CartItem} from "./CartItem.ts";
import {User} from "./User.ts";

export class Cart {

    id: number;
    shippingCost: number;
    totalCartPrice: number;
    subTotal: number;
    status: Status
    user: User
    items: CartItem[]

    constructor(id: number, shippingCost: number ,subTotal: number ,totalCartPrice: number, status: Status, user: User, items: CartItem[]) {
        this.id = id;
        this.shippingCost = shippingCost;
        this.totalCartPrice = totalCartPrice;
        this.subTotal = subTotal;
        this.status = status;
        this.user = user;
        this.items = items;
    }

}