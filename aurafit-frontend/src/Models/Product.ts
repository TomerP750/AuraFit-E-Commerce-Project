import { Gender } from "./Enums/Gender";
import {Category} from "./Category.ts";
import {ProductType} from "./ProductType.ts";
import {ProductVariant} from "./ProductVariant.ts";
import {Review} from "./Review.ts";


export class Product {
    id: number;
    name: string;
    description: string;
    gender: Gender
    category: Category
    productType: ProductType;
    onSale: boolean;
    variants: ProductVariant[];
    reviews: Review[];

    constructor(id: number, name:string , description: string, gender: Gender, category: Category, productType: ProductType, onSale: boolean , variants: ProductVariant[], reviews: Review[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gender = gender;
        this.category = category;
        this.productType = productType;
        this.onSale = onSale;
        this.variants = variants;
        this.reviews = reviews;
    }

}