package app.aurafitbackend.product;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public void addProduct(@RequestBody ProductCreateDTO productCreateDTO) {
        productService.createProduct(productCreateDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteProduct(Long id) {
        productService.deleteProduct(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void updateProduct(@RequestBody UpdateProductDTO product) {
        productService.updateProduct(product);
    }


}
