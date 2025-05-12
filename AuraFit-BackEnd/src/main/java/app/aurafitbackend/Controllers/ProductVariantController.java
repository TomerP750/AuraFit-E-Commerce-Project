package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.DTOS.CreateDTOS.ProductVariantCreateDto;
import app.aurafitbackend.Services.ProductVariantService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/variant")
@AllArgsConstructor
public class ProductVariantController {

    private final ProductVariantService productVariantService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public void newProduct(@RequestBody ProductVariantCreateDto dto) {
        productVariantService.createNewProductVariant(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productVariantService.deleteVariant(id);
    }




}
