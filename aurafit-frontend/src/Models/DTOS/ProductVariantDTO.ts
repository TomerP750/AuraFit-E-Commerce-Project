import {ProductDTO} from "./ProductDTO.ts";
import {Material} from "../Material.ts";
import {Color} from "../Color.ts";
import {Size} from "../Size.ts";
import {ProductVariantImage} from "../ProductVariantImage.ts";


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
    createdAt: Date
    updatedAt: Date
    images?: ProductVariantImage[];

    constructor(id: number, sku: string, stockQuantity: number, size:
    Size, color: Color, material: Material, basePrice: number,
                salePrice: number, onSale: boolean, product: ProductDTO, createdAt: Date, updatedAt: Date, images: ProductVariantImage[]) {
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
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.images = images;
    }
}