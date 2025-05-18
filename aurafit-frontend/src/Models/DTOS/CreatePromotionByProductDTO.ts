

export class CreatePromotionByProductDTO {
    name: string;
    discountPercent: number;
    startDate: Date;
    endDate: Date;
    productId: number;

    constructor(name: string, discountPercent: number, startDate: Date, endDate: Date, productId: number) {
        this.name = name;
        this.discountPercent = discountPercent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.productId = productId;
    }
}