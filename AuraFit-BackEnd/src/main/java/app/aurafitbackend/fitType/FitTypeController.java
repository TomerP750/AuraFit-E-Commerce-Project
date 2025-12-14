package app.aurafitbackend.fitType;

import app.aurafitbackend.Security.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fittype")
@AllArgsConstructor
public class FitTypeController {

    private final FitTypeService fitTypeService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public void addFitType(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody FitType fitType) {
        fitTypeService.addFitType(fitType);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteFitType(@PathVariable Long id) {
        fitTypeService.deleteFitType(id);
    }

}
