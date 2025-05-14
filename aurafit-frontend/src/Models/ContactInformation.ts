

export class ContactInformation {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    postalCode: string;

    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumber: string, street: string, city: string, postalCode: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
    }
}