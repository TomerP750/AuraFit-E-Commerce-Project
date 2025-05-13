import {ProductVariant} from "../ProductVariant.ts";
import {ProductVariantDTO} from "./ProductVariantDTO.ts";


export class CartItemDTO {
    id: number;
    variant: ProductVariantDTO;
    quantity: number;
    unitPrice: number;
    cartId: number;

    constructor(id: number, variant: ProductVariantDTO, quantity: number, unitPrice: number, cartId: number) {
        this.id = id;
        this.variant = variant;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.cartId = cartId;
    }
}