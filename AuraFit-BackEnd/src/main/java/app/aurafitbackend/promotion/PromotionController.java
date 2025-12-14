package app.aurafitbackend.promotion;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion")
@AllArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create/variant")
    public void createPromotionForVariant(@RequestBody CreatePromotionDTO promotion) {
        promotionService.createPromotionForOneVariant(promotion);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Promotion> getAllPromotions() {
        return promotionService.getAllPromotions();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create/byProduct")
    public void getPromotionById(@RequestBody CreatePromotionByProductDTO promotion) {
        promotionService.createPromotionsByProduct(promotion);
    }
}
