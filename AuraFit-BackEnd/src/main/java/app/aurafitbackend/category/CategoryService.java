package app.aurafitbackend.category;

import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.CategoryRepository;
import app.aurafitbackend.Utils.CategoryValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getOneCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(()->new NotExistsException("Category not found"));
    }


    public void addCategory(Category category) {
        if (CategoryValidator.isValidCategory(category)) {
            Category categoryToDb = Category.builder()
                    .name(category.getName())
                    .build();
            categoryRepository.save(categoryToDb);
        }
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public void updateCategory(Category category) {

    }





}
