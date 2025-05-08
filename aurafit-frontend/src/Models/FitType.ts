import {SubCategory} from "./SubCategory.ts";

export class FitType {
    id: number
    name: string
    subCategory: SubCategory

    constructor(id:number, name: string, subCategory: SubCategory) {
        this.id = id
        this.name = name
        this.subCategory = subCategory
    }
}