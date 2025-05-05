package app.aurafitbackend.Services;

import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.PromotionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;
    private final ProductVariantRepository productVariantRepository;


}
