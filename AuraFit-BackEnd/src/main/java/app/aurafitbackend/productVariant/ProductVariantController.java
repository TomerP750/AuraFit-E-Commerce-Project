package app.aurafitbackend.productVariant;

import app.aurafitbackend.DTOS.SearchDTO;
import app.aurafitbackend.Utils.EntityDTOMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/variant")
@AllArgsConstructor
public class ProductVariantController {

    private final ProductVariantService productVariantService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public void newVariant(@RequestBody ProductVariantCreateDto dto) {
        productVariantService.createNewProductVariant(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteVariant(@PathVariable Long id) {
        productVariantService.deleteVariant(id);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void updateVariant(@RequestBody UpdateVariantDTO newProductVariantDTO) {
        productVariantService.updateVariant(newProductVariantDTO);
    }


    @GetMapping("/search")
    public Page<ProductVariantDTO> search(@ModelAttribute SearchDTO crit) {
        return productVariantService
                .search(crit.getQuery(), crit.getPage(), crit.getSize())
                .map(EntityDTOMapper::variantToDto);
    }




}
