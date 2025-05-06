import { Gender } from "./Enums/Gender";
import {Category} from "./Category.ts";
import {SubCategory} from "./SubCategory.ts";
import {ProductVariant} from "./ProductVariant.ts";
import {Review} from "./Review.ts";


export class Product {
    id: number;
    description: string;
    gender: Gender
    category: Category
    subCategory: SubCategory;
    onSale: boolean;
    variants: ProductVariant[];
    reviews: Review[];

    constructor(id: number, description: string, gender: Gender, category: Category, subCategory: SubCategory, onSale: boolean ,variants: ProductVariant[], reviews: Review[]) {
        this.id = id;
        this.description = description;
        this.gender = gender;
        this.category = category;
        this.subCategory = subCategory;
        this.onSale = onSale;
        this.variants = variants;
        this.reviews = reviews;
    }

}