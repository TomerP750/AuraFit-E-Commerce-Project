package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Category;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public void addCategory(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody Category category) {
        categoryService.addCategory(category);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@AuthenticationPrincipal CustomUserDetails userDetails ,@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void updateCategory(@AuthenticationPrincipal CustomUserDetails userDetails ,@RequestBody Category category) {
        categoryService.updateCategory(category);
    }

}
