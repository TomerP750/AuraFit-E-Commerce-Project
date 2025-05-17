import axios from "axios";

class WishlistService {

    async allWishlistItems() {
        return (await axios.get("http://localhost:8080/api/wishlist/all")).data
    }

    async addProductToWishlist(variantId: number) {
        return (await axios.post(`http://localhost:8080/api/wishlist/addToWishlist/${variantId}`))
    }

    async deleteProductFromWishlist(variantId: number) {
        return (await axios.delete(`http://localhost:8080/api/wishlist/deleteItem/${variantId}`))
    }

    async isOnWishlist(variantId: number) {
        return (await axios.get(`http://localhost:8080/api/wishlist/wishlisted/${variantId}`)).data
    }

    async toggleWishlist(variantId: number) {
        return (await axios.post(`http://localhost:8080/api/wishlist/toggle/${variantId}`)).data
    }

}

const wishlistService = new WishlistService();
export default wishlistService;