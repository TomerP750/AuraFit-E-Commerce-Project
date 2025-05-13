

export class AddToCartRequestDTO {
    variantId: number;
    quantity: number;

    constructor(variantId: number, quantity: number) {
        this.variantId = variantId;
        this.quantity = quantity;
    }
}