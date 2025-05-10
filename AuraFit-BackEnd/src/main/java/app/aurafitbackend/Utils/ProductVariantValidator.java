package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import org.springframework.stereotype.Component;

@Component
public class ProductVariantValidator {

    private static ProductVariantRepository productVariantRepository;

    public ProductVariantValidator(ProductVariantRepository productVariantRepository) {
        ProductVariantValidator.productVariantRepository = productVariantRepository;
    }


    public static boolean isValidAddVariantToProduct(ProductVariant productVariant) {
        if (!productVariant.getSize().getProductType().equals(productVariant.getProduct().getProductType())) {
            throw new RequestException("Product variant size does not match product variant subcategory");
        }
        return true;
    }
}
