import axios from "axios";
import {Gender} from "../Models/Enums/Gender.ts";


class DisplayService {

    // async allMenClothing() {
    //     return (await axios.get("http://localhost:8080/api/display/men/clothing")).data
    // }
    //
    // async allWomenClothing() {
    //     return (await axios.get("http://localhost:8080/api/display/women/clothing")).data
    // }

    async allClothingByGender(gender: Gender) {
        return (await axios.get(`http://localhost:8080/api/display/clothing/${gender}`)).data
    }

    async getOneProductVariant(id: number) {
        return (await axios.get(`http://localhost:8080/api/display/variant/${id}`)).data
    }

    async getProductReviewAvg(id: number) {
        return (await axios.get(`http://localhost:8080/api/display/product/rating/avg/${id}`)).data
    }
}

const displayService = new DisplayService();
export default displayService;