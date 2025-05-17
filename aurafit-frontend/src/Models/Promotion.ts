import {Product} from "./Product.ts";
import {ProductVariant} from "./ProductVariant.ts";

export class Promotion {
    id: number
    name: string
    discountPercent: number
    startTime: Date
    endTime: Date
    isActive: boolean
    productVariant: ProductVariant

    constructor(id: number, name: string, discountPercent: number, startTime: Date, endTime: Date, isActive: boolean, productVariant: ProductVariant) {
        this.id = id
        this.name = name
        this.discountPercent = discountPercent
        this.startTime = startTime
        this.endTime = endTime
        this.isActive = isActive
        this.productVariant = productVariant
    }
}