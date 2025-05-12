import {Role} from "../Enums/Role.ts";

export class UserDTO {
    id: number;
    firstName: string
    lastName: string
    email: string
    role: Role

    constructor(id:number ,firstName: string, lastName: string, email: string, role: Role) {
        this.id = id;
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.role = role
    }
}