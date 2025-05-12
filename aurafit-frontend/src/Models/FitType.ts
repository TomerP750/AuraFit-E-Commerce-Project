import {ProductType} from "./ProductType.ts";

export class FitType {
    id: number
    name: string
    productType: ProductType

    constructor(id:number, name: string, productType: ProductType) {
        this.id = id
        this.name = name
        this.productType = productType
    }
}