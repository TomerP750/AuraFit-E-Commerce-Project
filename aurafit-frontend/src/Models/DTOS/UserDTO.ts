import {Role} from "../Enums/Role.ts";

export class UserDTO {
    firstName: string
    lastName: string
    email: string
    role: Role

    constructor(firstName: string, lastName: string, email: string, role: Role) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.role = role
    }
}