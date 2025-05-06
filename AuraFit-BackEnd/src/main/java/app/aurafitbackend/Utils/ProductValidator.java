package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.AddToCartRequestDTO;

public class ProductValidator {


    private ProductValidator() {
    }

    public static boolean isValidAddToCart(AddToCartRequestDTO addToCartRequest) {
        return true;
    }

}
