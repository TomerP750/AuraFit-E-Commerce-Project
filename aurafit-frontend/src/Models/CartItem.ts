import {Cart} from "./Cart.ts";


export class CartItem {
    id: number;
    unitPrice: number;
    quantity: number;
    variant: ProductVariant
    cart: Cart

}