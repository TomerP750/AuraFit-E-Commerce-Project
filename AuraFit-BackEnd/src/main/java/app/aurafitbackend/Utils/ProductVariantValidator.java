package app.aurafitbackend.Utils;

import app.aurafitbackend.productVariant.ProductVariant;
import app.aurafitbackend.productVariant.ProductVariantCreateDto;
import app.aurafitbackend.productVariant.UpdateVariantDTO;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import org.springframework.stereotype.Component;

@Component
public class ProductVariantValidator {

    private static ProductVariantRepository productVariantRepository;

    public ProductVariantValidator(ProductVariantRepository productVariantRepository) {
        ProductVariantValidator.productVariantRepository = productVariantRepository;
    }


    public static boolean isValidNewProductVariant(ProductVariantCreateDto productVariant) {
//        if (!productVariant.getSize().getProductType().equals(productVariant.getProduct().getProductType())) {
//            throw new RequestException("Product variant size does not match product variant subcategory");
//        }
        return true;
    }

    public static boolean isValidProductVariantCredentials(ProductVariant productVariant) {
//        if (!productVariant.getSize().getProductType().equals(productVariant.getProduct().getProductType())) {
//            throw new RequestException("Product variant size does not match product variant subcategory");
//        }
        return true;
    }

    public static boolean isValidProductVariantCredentials(UpdateVariantDTO productVariant) {
        return true;
    }
}
