import axios from "axios";
import {Gender} from "../Models/Enums/Gender.ts";
import {ProductDTO} from "../Models/DTOS/ProductDTO.ts";
import {ProductVariantDTO} from "../Models/DTOS/ProductVariantDTO.ts";
import {SearchDTO} from "../Models/DTOS/SearchDTO.ts";


class DisplayService {

    // async allMenClothing() {
    //     return (await axios.get("http://localhost:8080/api/display/men/clothing")).data
    // }
    //
    // async allWomenClothing() {
    //     return (await axios.get("http://localhost:8080/api/display/women/clothing")).data
    // }

    async getLatestVariants() {
        return (await axios.get("http://localhost:8080/api/display/variants/latestItems")).data
    }
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

    // -- test

    async allSizesByProductTypeTest(id: number) {
        return (await axios.get(`http://localhost:8080/api/display/variants/sizes/test/${id}`)).data
    }

    // --

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

    async allProductsByGender(gender: Gender) {
        return (await axios.get(`http://localhost:8080/api/display/product/${gender}/all`)).data
    }


    // Search feature
    async searchVariants(criteria: SearchDTO): Promise<ProductVariantDTO[]> {
        const { data } = await axios.get("http://localhost:8080/api/variant/search", { params: criteria });
        return data.content as ProductVariantDTO[];
    }

}

const displayService = new DisplayService();
export default displayService;