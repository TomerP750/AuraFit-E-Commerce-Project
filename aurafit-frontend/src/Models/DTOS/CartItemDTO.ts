

export class CartItemDTO {
    id: number;
    variantId: number;
    quantity: number;
    unitPrice: number;
    cartId: number;

    constructor(id: number, variantId: number, quantity: number, unitPrice: number, cartId: number) {
        this.id = id;
        this.variantId = variantId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.cartId = cartId;
    }
}