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

}

const wishlistService = new WishlistService();
export default wishlistService;