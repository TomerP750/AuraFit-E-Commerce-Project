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

    async allVariantsByProductId(id: number) {
        return (await axios.get(`http://localhost:8080/api/display/variants/byProductId/${id}`)).data
    }

    async allSizesByProductType(id: number) {
        return (await axios.get(`http://localhost:8080/api/display/variants/sizesByProductTypeId/${id}`)).data
    }

    async allColors() {
        return (await axios.get(`http://localhost:8080/api/display/color/all`)).data
    }

    async allSizes() {
        return (await axios.get("http://localhost:8080/api/display/size/all")).data
    }

    async allCategories() {
        return (await axios.get("http://localhost:8080/api/display/category/all")).data
    }

    async allProductTypes() {
        return (await axios.get("http://localhost:8080/api/display/productType/all")).data
    }


}

const displayService = new DisplayService();
export default displayService;