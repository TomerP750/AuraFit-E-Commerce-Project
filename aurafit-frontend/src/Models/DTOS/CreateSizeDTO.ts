import {ProductType} from "../ProductType.ts";

export class CreateSizeDTO {

    size: string
    productType: ProductType

    constructor(size: string, productType: ProductType) {
        this.size = size;
        this.productType = productType;
    }

}