import {ProductVariant} from "./ProductVariant.ts";


export class Material {
    id: number
    name: string
    materialPercent: number
    productVariant: ProductVariant;

    constructor(id: number, name:string, materialPercent: number ,productVariant: ProductVariant) {
        this.id = id
        this.name = name
        this.materialPercent = materialPercent
        this.productVariant = productVariant
    }
}