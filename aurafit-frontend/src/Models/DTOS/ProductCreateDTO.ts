import {ProductType} from "../ProductType.ts";
import {Category} from "../Category.ts";
import {Gender} from "../Enums/Gender.ts";


export class ProductCreateDTO {
    name: string;
    description: string;
    gender: Gender;
    category: Category;
    subCategory: ProductType;


    constructor(name:string ,description: string, gender: Gender  ,category: Category ,subCategory: ProductType) {
        this.name = name;
        this.description = description;
        this.gender = gender;
        this.category = category;
        this.subCategory = subCategory;
    }
}