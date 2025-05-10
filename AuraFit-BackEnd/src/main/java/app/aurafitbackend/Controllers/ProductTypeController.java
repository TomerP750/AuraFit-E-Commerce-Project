package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.ProductType;
import app.aurafitbackend.Services.ProductTypeService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subcategory")
@AllArgsConstructor
public class ProductTypeController {

    private final ProductTypeService productTypeService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public void addSubCategory(@RequestBody ProductType productType) {
        productTypeService.addProductType(productType);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteSubCategory(@PathVariable Long id) {
        productTypeService.deleteProductType(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void updateSubCategory(@RequestBody ProductType productType) {
        productTypeService.updateProductType(productType);
    }


}
