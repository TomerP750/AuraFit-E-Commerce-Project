import {ProductVariant} from "./ProductVariant.ts";
export class OrderItemDTO {
    id: number;
    totalPrice: number;
    unitPrice: number;
    quantity: number;
    variant: ProductVariant;

    constructor(id: number, totalPrice: number, unitPrice: number, quantity: number, variant: ProductVariant) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.variant = variant;
    }
}