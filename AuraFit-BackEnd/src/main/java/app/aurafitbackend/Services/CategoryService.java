package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.Repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public void addCategory(Category category) {
        if (category.getName().isEmpty()) {
            throw new InvalidInputException("Category name cannot be empty");
        }
        Category categoryToDb = Category.builder()
                .name(category.getName())
                .build();
        categoryRepository.save(categoryToDb);
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public void updateCategory(Category category) {

    }



}
