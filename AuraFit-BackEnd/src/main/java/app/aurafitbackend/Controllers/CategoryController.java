package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/add")
    public void addCategory(@RequestBody Category category) {
        categoryService.addCategory(category);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }

    @PutMapping("/update")
    public void updateCategory(@RequestBody Category category) {
        categoryService.updateCategory(category);
    }

}
