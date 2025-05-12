import { ProductVariant } from "./ProductVariant";
import {User} from "./User.ts";


export class WishlistItem {
    id: number;
    quantity: number;
    productVariant: ProductVariant;
    user: User;

    constructor(id: number, quantity: number, productVariant: ProductVariant, user: User) {
        this.id = id;
        this.quantity = quantity;
        this.productVariant = productVariant;
        this.user = user;
    }

}