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

    // Products

    async allProducts() {
        return (await axios.get("http://localhost:8080/api/admin/product/all")).data
    }

    async createProduct(product: ProductCreateDTO) {
        return (await axios.post("http://localhost:8080/api/product/create", product))
    }

    async getOneProduct(productId: number) {
        return (await axios.get(`http://localhost:8080/api/admin/product/${productId}`)).data
    }

    async deleteProduct(productId: number) {
        return (await axios.delete(`http://localhost:8080/api/admin/product/delete/${productId}`))
    }

    async getAllProductVariants() {
        return (await axios.get("http://localhost:8080/api/admin/variant/all")).data
    }
    async getOneProductVariant(variantId: number) {
        return (await axios.get(`http://localhost:8080/api/admin/variant/${variantId}`)).data
    }

    async deleteProductVariant(variantId: number) {
        return (await axios.delete(`http://localhost:8080/api/admin/variant/delete/${variantId}`)).data
    }

}

const adminService = new AdminService();
export default adminService;