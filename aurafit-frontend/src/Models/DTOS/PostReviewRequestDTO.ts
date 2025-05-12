import {Rating} from "../Enums/Rating.ts";
import {Product} from "../Product.ts";


export class PostReviewRequestDTO {
    content: string;
    rating: Rating;
    product: Product;

    constructor(content: string, rating: Rating, product: Product) {
        this.content = content;
        this.rating = rating;
        this.product = product;
    }
}