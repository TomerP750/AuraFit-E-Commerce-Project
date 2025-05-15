import axios from "axios";
import {UpdateUserDTO} from "../Models/DTOS/UpdateUserDTO.ts";


class UserService {

    async getProfile() {
        return (await axios.get("http://localhost:8080/api/user/profile")).data
    }

    async deleteUser(password: string) {
        return (await axios.delete(`http://localhost:8080/api/user/delete/${password}`))
    }

    async updateUser(dto: UpdateUserDTO) {
        return (await axios.put("http://localhost:8080/api/user/update", dto))
    }

}

const userService = new UserService();
export default userService;