
export class SearchDTO {
    query: string;
    page?: number;
    size?: number;

    constructor(query: string, page?: number, size?: number) {
        this.query = query;
        this.page = page;
        this.size = size;
    }
}