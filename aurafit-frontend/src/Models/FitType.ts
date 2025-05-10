import {ProductType} from "./ProductType.ts";

export class FitType {
    id: number
    name: string
    subCategory: ProductType

    constructor(id:number, name: string, subCategory: ProductType) {
        this.id = id
        this.name = name
        this.subCategory = subCategory
    }
}