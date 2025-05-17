import {CreatePromotionDTO} from "../Models/DTOS/CreatePromotionDTO.ts";
import axios from "axios";


class PromotionService {

    async createPromotionForOneVariant(dto: CreatePromotionDTO) {
        return (await axios.post(`http://localhost:8080/api/promotion/crate/variant`, dto))

    }


}

const promotionService = new PromotionService();
export default promotionService;