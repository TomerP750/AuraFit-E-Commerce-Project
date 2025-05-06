import {Material} from "./Enums/Material.ts";
import {Color} from "./Enums/Color.ts";
import {Size} from "./Size.ts";
import {Product} from "./Product.ts";


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

    constructor(id: number, size: number, color: Color,
                material: Material, sku: string, basePrice: number, salePrice: number,
                stockQuantity: number, onSale: boolean, product: Product, productImage?: string[]) {
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
    }



}