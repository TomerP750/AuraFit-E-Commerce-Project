import {LoginRequest} from "../Models/LoginRequest.ts";
import axios from "axios";
import {RegisterRequest} from "../Models/RegisterRequest.ts";

class AuthService {
    async login(loginRequest: LoginRequest) {
        return (await axios.post("http://localhost:8080/api/auth/login", loginRequest)).data
    }

    async register(registerRequest: RegisterRequest) {
        return (await axios.post("http://localhost:8080/api/auth/register", registerRequest)).data
    }
}

const authService = new AuthService();
export default authService;