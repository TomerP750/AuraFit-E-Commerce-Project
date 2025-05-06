import {Cart} from "./Cart.ts";
import {ProductVariant} from "./ProductVariant.ts";


export class CartItem {
    id: number;
    unitPrice: number;
    quantity: number;
    variant: ProductVariant
    cart: Cart

    constructor(id: number, unitPrice: number, quantity: number, variant: ProductVariant, cart: Cart) {
        this.id = id;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.variant = variant;
        this.cart = cart;
    }

}