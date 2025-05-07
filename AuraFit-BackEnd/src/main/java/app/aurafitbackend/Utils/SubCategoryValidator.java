package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.SubCategory;
import app.aurafitbackend.Exceptions.ExistsException;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.Repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SubCategoryValidator {

    private static SubCategoryRepository subCategoryRepository;

    @Autowired
    private SubCategoryValidator(SubCategoryRepository subCategoryRepository) {
        SubCategoryValidator.subCategoryRepository = subCategoryRepository;
    }

    public static boolean isValidSubCategory(SubCategory subCategory) {
        if (subCategory.getName().isEmpty()) {
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
