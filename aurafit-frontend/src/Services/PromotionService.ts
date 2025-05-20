import {CreatePromotionDTO} from "../Models/DTOS/CreatePromotionDTO.ts";
import axios from "axios";
import {CreatePromotionByProductDTO} from "../Models/DTOS/CreatePromotionByProductDTO.ts";


class PromotionService {

    async createPromotionForOneVariant(dto: CreatePromotionDTO) {
        return (await axios.post(`http://localhost:8080/api/promotion/create/variant`, dto))

    }

    async createPromotionForProduct(dto: CreatePromotionByProductDTO) {
        return (await axios.post(`http://localhost:8080/api/promotion/create/byProduct`, dto))
    }


}

const promotionService = new PromotionService();
export default promotionService;