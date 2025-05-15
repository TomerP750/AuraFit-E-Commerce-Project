package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.DisplayDTOS.UserDTO;
import app.aurafitbackend.Services.*;
import lombok.AllArgsConstructor;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;


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
    private final ProductService productService;
    private final ProductVariantService productVariantService;
    private final AdminService adminService;


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
    public ProductType oneProductType(@PathVariable Long id) {
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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/product/all")
    public List<Product> allProducts() {
        return productService.getProducts();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/product/{id}")
    public Product oneProduct(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/product/delete/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/variant/all")
    public List<ProductVariant> allProductVariants() {
        return productVariantService.getAllProductVariants();
    }

//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/variant/all")
//    public Page<ProductVariant> allProductVariants(@PageableDefault(size = 10) Pageable pageable) {
//        return productVariantService.getAllProductVariants(pageable);
//    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/variant/{id}")
    public ProductVariant oneProductVariant(@PathVariable Long id) {
        return productVariantService.getProductVariant(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/variant/delete/{id}")
    public void deleteProductVariant(@PathVariable Long id) {
        productVariantService.deleteVariant(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/all")
    public List<UserDTO> allUsers() {
        return adminService.allUsers();
    }



}
