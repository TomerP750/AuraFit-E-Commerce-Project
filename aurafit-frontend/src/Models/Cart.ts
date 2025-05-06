import {Status} from "./Enums/Status.ts";
import {CartItem} from "./CartItem.ts";
import {User} from "./User.ts";

export class Cart {

    id: number;
    shippingCost: number;
    totalPrice: number;
    status: Status
    user: User
    items: CartItem[]

    constructor(id: number, shippingCost: number ,totalPrice: number, status: Status, user: User, items: CartItem[]) {
        this.id = id;
        this.shippingCost = shippingCost;
        this.totalPrice = totalPrice;
        this.status = status;
        this.user = user;
        this.items = items;
    }

}