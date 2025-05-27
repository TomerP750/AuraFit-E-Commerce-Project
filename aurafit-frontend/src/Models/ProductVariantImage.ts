import { ProductVariant } from "./ProductVariant";

export class ProductVariantImage {
    id: number;
    imageUrl: string;
    variant:  ProductVariant;

    constructor(id: number, imageUrl: string, variant:  ProductVariant) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.variant =  variant;
    }
}