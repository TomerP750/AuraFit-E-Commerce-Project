import axios from "axios";
import {ProductVariantCreateDTO} from "../Models/DTOS/ProductVariantCreateDTO.ts";
import {ProductCreateDTO} from "../Models/DTOS/ProductCreateDTO.ts";

class AdminService {

    async allCategories() {
        return (await axios.get("http://localhost:8080/api/admin/category/all")).data
    }

    async allSubCategories() {
        return (await axios.get("http://localhost:8080/api/admin/subcategory/all")).data
    }

    async allMaterials() {
        return (await axios.get("http://localhost:8080/api/admin/material/all")).data
    }

    async allFitTypes() {
        return (await axios.get("http://localhost:8080/api/admin/fittype/all")).data
    }

    async allSizes() {
        return (await axios.get("http://localhost:8080/api/admin/size/all")).data
    }

    async allColors() {
        return (await axios.get("http://localhost:8080/api/admin/color/all")).data
    }

    async createProduct(product: ProductCreateDTO) {
        return await axios.post("http://localhost:8080/api/product/create", product)
    }

}

const adminService = new AdminService();
export default adminService;