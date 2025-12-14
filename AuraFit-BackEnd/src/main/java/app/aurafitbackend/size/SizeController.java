package app.aurafitbackend.size;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/size")
@AllArgsConstructor
public class SizeController {

    private final SizeService sizeService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public void createSize(@RequestBody CreateSizeDTO dto) {
        sizeService.addSize(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteSize(@PathVariable Long id) {
        sizeService.deleteSize(id);
    }



}
