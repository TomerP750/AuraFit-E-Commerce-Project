import axios from "axios";
import {ProductCreateDTO} from "../Models/DTOS/ProductCreateDTO.ts";
import {Category} from "../Models/Category.ts";
import {ProductType} from "../Models/ProductType.ts";
import {Material} from "../Models/Material.ts";
import {ProductVariantCreateDTO} from "../Models/DTOS/ProductVariantCreateDTO.ts";
import {User} from "../Models/User.ts";
import {Size} from "../Models/Size.ts";
import {FitType} from "../Models/FitType.ts";
import {Color} from "../Models/Color.ts";

class AdminService {

    async allCategories() {
        return (await axios.get<Category[]>("http://localhost:8080/api/admin/category/all")).data
    }

    async createCategory(category: Category) {
        return (await axios.post(`http://localhost:8080/api/category/add`, category)).data
    }

    async deleteCategory(id: number) {
        return (await axios.delete(`http://localhost:8080/api/category/delete/${id}`)).data
    }

    async allProductTypes() {
        return (await axios.get<ProductType[]>("http://localhost:8080/api/admin/producttype/all")).data
    }

    async createProductType(productType: ProductType) {
        return (await axios.post(`http://localhost:8080/api/producttype/create`, productType)).data
    }

    async deleteProductType(id: number) {
        return (await axios.delete(`http://localhost:8080/api/producttype/delete/${id}`)).data
    }

    async updateProductType(productType: ProductType) {
        return (await axios.put("http://localhost:8080/api/producttype/update", productType)).data
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

    async oneFitType(id: number) {
        return (await axios.get(`http://localhost:8080/api/admin/fittype/${id}`)).data
    }

    async createFitType(fitType: FitType) {
        return (await axios.post(`http://localhost:8080/api/fittype/create`, fitType)).data
    }

    async deleteFitType(id: number) {
        return (await axios.delete(`http://localhost:8080/api/fittype/delete/${id}`)).data
    }

    async allSizes() {
        return (await axios.get("http://localhost:8080/api/admin/size/all")).data
    }

    async createSize(size: Size) {
        return (await axios.post("http://localhost:8080/api/size/create", size)).data
    }

    async deleteSize(id: number) {
        return (await axios.delete(`http://localhost:8080/api/size/delete/${id}`))
    }

    async allColors() {
        return (await axios.get("http://localhost:8080/api/admin/color/all")).data
    }

    async createColor(color: Color) {
        return (await axios.post("http://localhost:8080/api/color/create", color)).data
    }

    async deleteColor(id: number) {
        return (await axios.delete(`http://localhost:8080/api/color/${id}`)).data
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

    // Product Variants -------------

    async getAllProductVariants() {
        return (await axios.get("http://localhost:8080/api/admin/variant/all")).data
    }
    async getOneProductVariant(variantId: number) {
        return (await axios.get(`http://localhost:8080/api/admin/variant/${variantId}`)).data
    }

    async createProductVariant(variant: ProductVariantCreateDTO) {
        return (await axios.post("http://localhost:8080/api/variant/create", variant))
    }

    async deleteProductVariant(variantId: number) {
        return (await axios.delete(`http://localhost:8080/api/admin/variant/delete/${variantId}`)).data
    }

    // Users --------------------

    async allUsers() {
        return (await axios.get<User[]>("http://localhost:8080/api/admin/user/all")).data
    }




}

const adminService = new AdminService();
export default adminService;