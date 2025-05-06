import {Status} from "./Enums/Status.ts";

export class Cart {

    id: number;
    totalPrice: number;
    status: Status
    user: User
    items: CartItem[]

    constructor(id: number, totalPrice: number, status: Status) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.status = status;
    }

}