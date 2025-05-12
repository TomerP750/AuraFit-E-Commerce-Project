import {Product} from "./Product.ts";

export class Promotion {
    id: number
    name: string
    discountPercent: number
    startTime: Date
    endTime: Date
    isActive: boolean
    product: Product

    constructor(id: number, name: string, discountPercent: number, startTime: Date, endTime: Date, isActive: boolean, product: Product) {
        this.id = id
        this.name = name
        this.discountPercent = discountPercent
        this.startTime = startTime
        this.endTime = endTime
        this.isActive = isActive
        this.product = product
    }
}