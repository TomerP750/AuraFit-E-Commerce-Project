import {ProductVariant} from "./ProductVariant.ts";
import {ProductVariantDTO} from "./DTOS/ProductVariantDTO.ts";
export class OrderItemDTO {
    id: number;
    totalPrice: number;
    unitPrice: number;
    quantity: number;
    variant: ProductVariantDTO;

    constructor(id: number, totalPrice: number, unitPrice: number, quantity: number, variant: ProductVariantDTO) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.variant = variant;
    }
}