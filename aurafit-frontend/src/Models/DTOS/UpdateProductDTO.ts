import {Gender} from "../Enums/Gender.ts";
import {Category} from "../Category.ts";
import {ProductType} from "../ProductType.ts";

export class UpdateProductDTO {
    id: number
    name: string
    description: string
    gender: Gender
    category: Category
    productType: ProductType

    constructor(id: number, name: string, description: string, gender: Gender, category: Category, productType: ProductType) {
        this.id = id
        this.name = name
        this.description = description
        this.gender = gender
        this.category = category
        this.productType = productType
    }
}