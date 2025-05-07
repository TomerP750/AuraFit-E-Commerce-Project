package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Exceptions.InvalidInputException;

public class CategoryValidator {

    private CategoryValidator() {}


    public static boolean isValidCategory(Category category) {
        if (category.getName().isEmpty()) {
            throw new InvalidInputException("Category name cannot be empty");
        }
        return true;
    }
}
