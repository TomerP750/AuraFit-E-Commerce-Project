import {LoginRequest} from "../Models/LoginRequest.ts";
import axios from "axios";
import {RegisterRequest} from "../Models/RegisterRequest.ts";

class AuthService {
    async login(loginRequest: LoginRequest) {
        return (await axios.post("http://localhost:5000/auth/login", loginRequest)).data
    }

    async register(registerRequest: RegisterRequest) {
        return (await axios.post("http://localhost:5000/auth/register", registerRequest)).data
    }
}

const authService = new AuthService();
export default authService;