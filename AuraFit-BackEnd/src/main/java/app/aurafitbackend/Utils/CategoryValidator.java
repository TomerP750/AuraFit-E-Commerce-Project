package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Exceptions.ExistsException;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.Repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CategoryValidator {


    private static CategoryRepository categoryRepository;

    @Autowired
    private CategoryValidator(CategoryRepository categoryRepository) {
        CategoryValidator.categoryRepository = categoryRepository;
    }

    public static boolean isValidCategory(Category category) {
        if (category.getName().isEmpty()) {
            throw new InvalidInputException("Category name cannot be empty");
        }

        boolean nameExists = categoryRepository.existsByName(category.getName());
        if (nameExists) {
            throw new ExistsException("Category name already exists");
        }
        return true;
    }
}
