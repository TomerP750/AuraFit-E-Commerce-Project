package app.aurafitbackend.Utils;

import app.aurafitbackend.product.Product;
import app.aurafitbackend.cart.CartDTOS.AddToCartRequestDTO;
import app.aurafitbackend.product.UpdateProductDTO;

public class ProductValidator {


    private ProductValidator() {
    }

    public static boolean isValidAddToCart(AddToCartRequestDTO addToCartRequest) {
        return true;
    }

    public static boolean isValidProduct(Product product) {
        return true;
    }

    public static boolean isValidProduct(UpdateProductDTO product) {
        return true;
    }

}
