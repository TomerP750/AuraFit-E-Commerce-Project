
import {Size} from "./Size.ts";
import {Product} from "./Product.ts";
import {Color} from "./Color.ts";
import {Material} from "./Material.ts";


export class ProductVariant {
    id: number;
    size: Size;
    color: Color;
    material: Material
    sku: string;
    basePrice: number;
    salePrice: number;
    stockQuantity: number;
    onSale: boolean;
    product: Product;
    productImage?: string[];
    createdAt: Date;

    constructor(id: number, size: Size, color: Color,
                material: Material, sku: string, basePrice: number, salePrice: number,
                stockQuantity: number, onSale: boolean, product: Product, createdAt: Date ,productImage?: string[]) {
        this.id = id;
        this.size = size;
        this.color = color;
        this.material = material;
        this.sku = sku;
        this.basePrice = basePrice;
        this.salePrice = salePrice;
        this.stockQuantity = stockQuantity;
        this.onSale = onSale;
        this.product = product;
        this.productImage = productImage;
        this.createdAt = createdAt;
    }



}