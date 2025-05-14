import {Status} from "../Enums/Status.ts";
import {ContactInformation} from "../ContactInformation.ts";
import {OrderItemDTO} from "../OrderItemDTO.ts";


export class OrderResponseDTO {
    id: number;
    totalPrice: number;
    orderItems: OrderItemDTO[];
    orderDate: Date;
    status: Status;
    orderNumber: number;
    contactInformation: ContactInformation;

    constructor(id: number, totalPrice: number, orderItems: OrderItemDTO[], orderDate: Date, status: Status, orderNumber: number, contactInformation: ContactInformation) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.orderItems = orderItems;
        this.orderDate = orderDate;
        this.status = status;
        this.orderNumber = orderNumber;
        this.contactInformation = contactInformation;
    }


}