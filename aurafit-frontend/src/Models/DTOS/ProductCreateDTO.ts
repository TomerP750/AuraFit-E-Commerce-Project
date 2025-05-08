import {SubCategory} from "../SubCategory.ts";
import {Category} from "../Category.ts";
import {ProductVariant} from "../ProductVariant.ts";


export class ProductCreateDTO {
    description: string;
    category: Category;
    subCategory: SubCategory;


    constructor(description: string, category: Category, subCategory: SubCategory) {
        this.description = description;
        this.category = category;
        this.subCategory = subCategory;
    }
}