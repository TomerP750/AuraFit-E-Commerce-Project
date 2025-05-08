package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final SubCategoryService subCategoryService;
    private final CategoryService categoryService;
    private final MaterialService materialService;
    private final FitTypeService fitTypeService;
    private final SizeService sizeService;
    private final ColorService colorService;


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/category/all")
    public List<Category> allCategories(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return categoryService.getAllCategories();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/fittype/all")
    public List<FitType> allFitTypes(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return fitTypeService.getAllFitTypes();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/subcategory/all")
    public List<SubCategory> allSubCategories(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return subCategoryService.getAllSubCategories();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/material/all")
    public List<Material> allMaterials(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return materialService.getAllMaterials();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/size/all")
    public List<Size> allSizes(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return sizeService.getAllSizes();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/color/all")
    public List<Color> allColors(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return colorService.getAllColors();
    }




}
