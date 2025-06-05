import {AddToCartRequestDTO} from "../Models/DTOS/AddToCartRequestDTO.ts";
import axios from "axios";


class CartService {

    async addToCart(addToCartReq: AddToCartRequestDTO) {
        return (await axios.post(`http://localhost:8080/api/cart/addToCart`, addToCartReq)).data
    }

    async addToGuestCart(addToCartReq: AddToCartRequestDTO) {
        return (await axios.post(`http://localhost:8080/api/cart/guest/addToCart`, addToCartReq, { withCredentials: true })).data
    }

    async getUserCart() {
        return (await axios.get(`http://localhost:8080/api/cart/user/get`, {withCredentials: true})).data
    }

    async getGuestCart() {
        return (await axios.get(`http://localhost:8080/api/cart/guest/get`, {withCredentials: true})).data
    }

    async removeItemFromCart(id: number) {
        return (await axios.delete(`http://localhost:8080/api/cart/removeItemFromCart/${id}`, { withCredentials: true })).data
    }

    async removeOneQuantityFromCartItem(id: number) {
        return (await axios.delete(`http://localhost:8080/api/cart/removeOne/${id}`, { withCredentials: true })).data
    }

}

const cartService = new CartService();
export default cartService;