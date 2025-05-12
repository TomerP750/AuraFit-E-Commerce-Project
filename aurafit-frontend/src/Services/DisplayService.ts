import axios from "axios";


class DisplayService {

    async allMenClothing() {
        return (await axios.get("http://localhost:8080/api/display/men/clothing")).data
    }

    async getOneProductVariant(id: number) {
        return (await axios.get(`http://localhost:8080/api/display/variant/${id}`)).data
    }
}

const displayService = new DisplayService();
export default displayService;