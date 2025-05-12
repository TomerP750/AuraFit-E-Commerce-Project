

export class UpdateReviewDTO {
    id: number;
    content: string;
    rating: number;

    constructor(id: number ,content: string, rating: number) {
        this.content = content;
        this.rating = rating;
    }
}