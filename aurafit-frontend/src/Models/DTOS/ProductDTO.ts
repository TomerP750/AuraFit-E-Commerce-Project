import {ProductVariantDTO} from "./ProductVariantDTO.ts";
import {ProductType} from "../ProductType.ts";
import {Category} from "../Category.ts";
import {Gender} from "../Enums/Gender.ts";


export class ProductDTO {
    id: number;
    name: string;
    description: string;
    category: Category;
    gender: Gender;
    productType: ProductType;
    onSale: boolean;
    // variants: ProductVariantDTO[]

    constructor(id: number, name: string, description: string, category: Category, gender: Gender, productType: ProductType, onSale: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.gender = gender;
        this.productType = productType;
        this.onSale = onSale;
        // this.variants = variants;
    }
}