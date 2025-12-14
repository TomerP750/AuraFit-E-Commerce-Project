package app.aurafitbackend.material;

import app.aurafitbackend.Security.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/material")
@AllArgsConstructor
public class MaterialController {

    private final MaterialService materialService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public void addMaterial(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody Material material) {
        materialService.addMaterial(material);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteMaterial(@AuthenticationPrincipal CustomUserDetails userDetails ,@PathVariable Long id) {
        materialService.deleteMaterial(id);
    }


}
