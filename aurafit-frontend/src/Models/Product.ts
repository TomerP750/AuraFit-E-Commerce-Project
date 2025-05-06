import { Gender } from "./Enums/Gender";
import {Category} from "./Category.ts";
import {SubCategory} from "./SubCategory.ts";
import {ProductVariant} from "./ProductVariant.ts";


export class Product {
    id: number;
    description: string;
    gender: Gender
    category: Category
    subCategory: SubCategory;
    onSale: boolean;
    variants: ProductVariant[];
    reviews: Review[];

}