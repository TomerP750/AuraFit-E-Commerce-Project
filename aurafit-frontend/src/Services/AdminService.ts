import axios from "axios";
import {ProductCreateDTO} from "../Models/DTOS/ProductCreateDTO.ts";
import {Category} from "../Models/Category.ts";
import {ProductType} from "../Models/ProductType.ts";
import {Material} from "../Models/Material.ts";

class AdminService {

    async allCategories() {
        return (await axios.get<Category[]>("http://localhost:8080/api/admin/category/all")).data
    }

    async allProductTypes() {
        return (await axios.get<ProductType[]>("http://localhost:8080/api/admin/producttype/all")).data
    }

    async allMaterials() {
        return (await axios.get("http://localhost:8080/api/admin/material/all")).data
    }

    async createMaterial(material: Material) {
        return (await axios.post("http://localhost:8080/api/material/add", material)).data
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
        return (await axios.post("http://localhost:8080/api/product/create", product))
    }

    async getOneProduct(productId: number) {

    }

}

const adminService = new AdminService();
export default adminService;