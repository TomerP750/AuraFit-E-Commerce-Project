import {ProductType} from "../ProductType.ts";

export class SizeCrudDTO {
    id: number
    size: string
    productType: ProductType[]

    constructor(id: number, size: string, productType: ProductType[]) {
        this.id = id
        this.size = size
        this.productType = productType
    }
}