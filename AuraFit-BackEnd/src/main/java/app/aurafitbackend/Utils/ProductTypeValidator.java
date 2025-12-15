package app.aurafitbackend.Utils;

import app.aurafitbackend.productType.ProductType;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.productType.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductTypeValidator {

    private static ProductTypeRepository productTypeRepository;

    @Autowired
    private ProductTypeValidator(ProductTypeRepository productTypeRepository) {
        ProductTypeValidator.productTypeRepository = productTypeRepository;
    }

    public static boolean isValidProductType(ProductType productType) {
        if (productType.getName().isEmpty()) {
            throw new InvalidInputException("SubCategory name cannot be empty");
        }
//        boolean exists = subCategoryRepository.existsById(subCategory.getId());
//
//        if (exists) {
//            throw new ExistsException("SubCategory already exists");
//        }
        return true;
    }
}
