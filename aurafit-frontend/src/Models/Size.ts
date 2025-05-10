import {ProductType} from "./ProductType.ts";

export class Size {

    id: number
    size: string
    subCategory: ProductType

    constructor(id: number, size: string, subCategory: ProductType) {
        this.id = id
        this.size = size
        this.subCategory = subCategory
    }

}