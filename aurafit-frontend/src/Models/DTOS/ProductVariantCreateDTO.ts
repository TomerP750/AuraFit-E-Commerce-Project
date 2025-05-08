import {Size} from "../Size.ts";
import {Color} from "../Color.ts";
import {Material} from "../Material.ts";



export class ProductVariantCreateDTO {
    size: Size
    color: Color
    material: Material
    price: number
    stockQuantity: number

    constructor(size: Size, color: Color, material: Material, price: number, stockQuantity: number) {
        this.size = size
        this.color = color
        this.material = material
        this.price = price
        this.stockQuantity = stockQuantity
    }



}