import {SubCategory} from "../SubCategory.ts";
import {Category} from "../Category.ts";
import {Gender} from "../Enums/Gender.ts";


export class ProductCreateDTO {
    description: string;
    gender: Gender;
    category: Category;
    subCategory: SubCategory;


    constructor(description: string, gender: Gender  ,category: Category ,subCategory: SubCategory) {
        this.description = description;
        this.gender = gender;
        this.category = category;
        this.subCategory = subCategory;
    }
}