import {Size} from "../Size.ts";
import {Color} from "../Color.ts";
import {Material} from "../Material.ts";
import {Product} from "../Product.ts";



export class ProductVariantCreateDTO {
    size: Size
    color: Color
    material: Material
    basePrice: number
    stockQuantity: number
    product: Product

    constructor(size: Size, color: Color, material: Material, basePrice: number, stockQuantity: number, product: Product) {
        this.size = size
        this.color = color
        this.material = material
        this.basePrice = basePrice
        this.stockQuantity = stockQuantity
        this.product = product
    }



}