package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.SubCategory;
import app.aurafitbackend.Services.SubCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subcategory")
@AllArgsConstructor
public class SubCategoryController {

    private final SubCategoryService subCategoryService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public void addSubCategory(@RequestBody SubCategory subCategory) {
        subCategoryService.addSubCategory(subCategory);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteSubCategory(@PathVariable Long id) {
        subCategoryService.deleteSubCategory(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void updateSubCategory(@RequestBody SubCategory subCategory) {
        subCategoryService.updateSubCategory(subCategory);
    }


}
