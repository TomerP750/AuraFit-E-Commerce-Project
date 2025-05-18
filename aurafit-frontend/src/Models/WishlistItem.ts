import { ProductVariant } from "./ProductVariant";
import {User} from "./User.ts";
import {Product} from "./Product.ts";


export class WishlistItem {
    id: number;
    quantity: number;
    product: Product;
    user: User;

    constructor(id: number, quantity: number, product: Product, user: User) {
        this.id = id;
        this.quantity = quantity;
        this.product = product;
        this.user = user;
    }

}