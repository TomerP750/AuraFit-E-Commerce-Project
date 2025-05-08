package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.Services.*;
import lombok.AllArgsConstructor;
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


    @GetMapping("/category/all")
    public List<Category> allCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/fittype/all")
    public List<FitType> allFitTypes() {
        return fitTypeService.getAllFitTypes();
    }

    @GetMapping("/subcategory/all")
    public List<SubCategory> allSubCategories() {
        return subCategoryService.getAllSubCategories();
    }

    @GetMapping("/material/all")
    public List<Material> allMaterials() {
        return materialService.getAllMaterials();
    }

    @GetMapping("/size/all")
    public List<Size> allSizes() {
        return sizeService.getAllSizes();
    }

    @GetMapping("/color/all")
    public List<Color> allColors() {
        return colorService.getAllColors();
    }




}
