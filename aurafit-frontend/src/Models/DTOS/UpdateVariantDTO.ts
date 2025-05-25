import {Size} from "../Size.ts";
import {Color} from "../Color.ts";
import {Product} from "../Product.ts";


export class UpdateVariantDTO {
    id: number;
    size: Size;
    color: Color;
    basePrice: number;
    stockQuantity: number;
    product: Product;
    // imagesUrl: string[];

    constructor(id: number, size: Size, color: Color, basePrice: number, stockQuantity: number, product: Product) {
        this.id = id;
        this.size = size;
        this.color = color;
        this.basePrice = basePrice;
        this.stockQuantity = stockQuantity;
        this.product = product;
        // this.imagesUrl = imagesUrl;
    }

}