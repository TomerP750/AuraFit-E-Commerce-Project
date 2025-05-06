import {Role} from "./Enums/Role.ts";


export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role
    memberShipPoints: number;

    constructor(id: number, firstName: string, lastName: string, email: string, role: Role, memberShipPoints: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.memberShipPoints = memberShipPoints;

    }
}