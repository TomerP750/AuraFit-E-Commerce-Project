import {SubCategory} from "../SubCategory.ts";
import {Category} from "../Category.ts";
import {Gender} from "../Enums/Gender.ts";


export class ProductCreateDTO {
    name: string;
    description: string;
    gender: Gender;
    category: Category;
    subCategory: SubCategory;


    constructor(name:string ,description: string, gender: Gender  ,category: Category ,subCategory: SubCategory) {
        this.name = name;
        this.description = description;
        this.gender = gender;
        this.category = category;
        this.subCategory = subCategory;
    }
}