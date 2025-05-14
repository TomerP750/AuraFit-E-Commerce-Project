import axios from "axios";
import {ContactInformation} from "../Models/ContactInformation.ts";


class OrderService {

    async checkoutUser(data: ContactInformation) {
        return (await axios.post("http://localhost:8080/api/order/user/placeOrder", data)).data
    }

}

const orderService = new OrderService();
export default orderService;