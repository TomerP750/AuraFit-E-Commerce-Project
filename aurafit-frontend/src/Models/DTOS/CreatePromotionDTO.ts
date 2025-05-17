import { ProductVariant } from "../ProductVariant";

export class CreatePromotionDTO {

    name: string;
    discountPercent: number;
    startTime: Date;
    endTime: Date;
    productVariant: ProductVariant;

    constructor(name: string, discountPercent: number, startTime: Date, endTime: Date, productVariant: ProductVariant) {
        this.name = name;
        this.discountPercent = discountPercent;
        this.startTime = startTime;
        this.endTime = endTime;
        this.productVariant = productVariant;
    }

}