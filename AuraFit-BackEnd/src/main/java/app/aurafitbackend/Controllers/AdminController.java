package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.Services.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final ProductTypeService productTypeService;
    private final CategoryService categoryService;
    private final MaterialService materialService;
    private final FitTypeService fitTypeService;
    private final SizeService sizeService;
    private final ColorService colorService;


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/category/all")
    public List<Category> allCategories() {
        return categoryService.getAllCategories();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/category/{id}")
    public Category oneCategory(@PathVariable Long id) {
        return categoryService.getOneCategory(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/fittype/all")
    public List<FitType> allFitTypes() {
        return fitTypeService.getAllFitTypes();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/fittype/{id}")
    public FitType oneFitType(@PathVariable Long id) {
        return fitTypeService.getOneFitType(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/producttype/all")
    public List<ProductType> allSubCategories() {
        return productTypeService.getAllProductTypes();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/producttype/{id}")
    public ProductType oneSubCategory(@PathVariable Long id) {
        return productTypeService.getOneProductType(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/material/all")
    public List<Material> allMaterials() {
        return materialService.getAllMaterials();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/material/{id}")
    public Material oneMaterial(@PathVariable Long id) {
        return materialService.getOneMaterial(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/size/all")
    public List<Size> allSizes() {
        return sizeService.getAllSizes();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/size/{id}")
    public Size oneSize(@PathVariable Long id) {
        return sizeService.getOneSize(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/color/all")
    public List<Color> allColors() {
        return colorService.getAllColors();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/color/{id}")
    public Color oneColor(@PathVariable Long id) {
        return colorService.getOneColor(id);
    }




}
