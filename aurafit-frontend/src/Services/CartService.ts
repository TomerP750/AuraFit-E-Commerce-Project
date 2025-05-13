import {AddToCartRequestDTO} from "../Models/DTOS/AddToCartRequestDTO.ts";
import axios from "axios";


class CartService {

    async addToCart(addToCartReq: AddToCartRequestDTO) {
        return (await axios.post(`http://localhost:8080/api/cart/addToCart`, addToCartReq)).data
    }

}

const cartService = new CartService();
export default cartService;