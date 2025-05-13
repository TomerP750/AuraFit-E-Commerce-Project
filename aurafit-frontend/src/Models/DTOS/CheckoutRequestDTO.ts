

export class CheckoutRequestDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;

    constructor(firstName: string, lastName: string, email: string, phone: string, address: string, city: string, postalCode: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
    }


}