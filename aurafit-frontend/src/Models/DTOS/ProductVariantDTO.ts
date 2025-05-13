import {ProductDTO} from "./ProductDTO.ts";
import {Material} from "../Material.ts";
import {Color} from "../Color.ts";
import {Size} from "../Size.ts";


export class ProductVariantDTO {
    id: number
    sku: string
    stockQuantity: number
    size: Size
    color: Color
    material: Material;
    basePrice: number
    salePrice: number
    onSale: boolean
    product: ProductDTO

    constructor(id: number, sku: string, stockQuantity: number, size:
    Size, color: Color, material: Material, basePrice: number,
                salePrice: number, onSale: boolean, product: ProductDTO) {
        this.id = id;
        this.sku = sku;
        this.stockQuantity = stockQuantity;
        this.size = size;
        this.onSale = onSale;
        this.color = color;
        this.material = material;
        this.basePrice = basePrice;
        this.salePrice = salePrice;
        this.product = product;
    }
}