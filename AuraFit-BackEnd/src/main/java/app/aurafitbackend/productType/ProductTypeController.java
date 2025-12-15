package app.aurafitbackend.productType;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/producttype")
@AllArgsConstructor
public class ProductTypeController {

    private final ProductTypeService productTypeService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public void createProductType(@RequestBody ProductType productType) {
        productTypeService.addProductType(productType);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteProductType(@PathVariable Long id) {
        productTypeService.deleteProductType(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void updateProductType(@RequestBody ProductType productType) {
        productTypeService.updateProductType(productType);
    }


}
