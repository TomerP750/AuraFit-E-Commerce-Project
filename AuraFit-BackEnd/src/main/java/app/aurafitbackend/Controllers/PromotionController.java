package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Promotion;
import app.aurafitbackend.DTOS.CreateDTOS.CreatePromotionDTO;
import app.aurafitbackend.Services.PromotionService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promotion")
@AllArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create/variant/{id}")
    public void createPromotionForVariant(@RequestBody CreatePromotionDTO promotion) {
        promotionService.createPromotionForOneVariant(promotion);
    }
}
