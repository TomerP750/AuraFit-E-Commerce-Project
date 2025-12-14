package app.aurafitbackend.color;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/color")
@AllArgsConstructor
public class ColorController {

    private final ColorService colorService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public void createColor(@RequestBody Color color) {
        colorService.createColor(color);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteColor(@PathVariable Long id) {
        colorService.deleteColor(id);
    }

}
