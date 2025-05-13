import {CheckoutRequestDTO} from "../Models/DTOS/CheckoutRequestDTO.ts";
import axios from "axios";


class OrderService {

    async placeOrder(data: CheckoutRequestDTO) {
        return (await axios.post("http://localhost:8080/api/order/user/placeOrder", data)).data
    }

}

const orderService = new OrderService();
export default orderService;