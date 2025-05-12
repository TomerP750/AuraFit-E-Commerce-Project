import {User} from "./User.ts";
import {Product} from "./Product.ts";
import { Rating } from "./Enums/Rating.ts";

export class Review {
    id: number;
    user: User;
    rating: number;
    content: string;
    reviewDate: Date;
    product: Product;

    constructor(id: number, user: User, rating: number, content: string, reviewDate: Date, product: Product) {
        this.id = id;
        this.user = user;
        this.content = content;
        this.rating = rating;
        this.reviewDate = reviewDate;
        this.product = product;
    }
}