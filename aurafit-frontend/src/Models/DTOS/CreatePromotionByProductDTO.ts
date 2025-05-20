import {Product} from "../Product.ts";


export class CreatePromotionByProductDTO {
    name: string;
    discountPercent: number;
    startTime: Date;
    endTime: Date;
    product: Product;

    constructor(name: string, discountPercent: number, startTime: Date, endTime: Date, product: Product) {
        this.name = name;
        this.discountPercent = discountPercent;
        this.startTime = startTime;
        this.endTime = endTime;
        this.product = product;
    }
}