package app.aurafitbackend.Threads;

import app.aurafitbackend.productVariant.ProductVariant;
import app.aurafitbackend.promotion.Promotion;
import app.aurafitbackend.productVariant.ProductVariantRepository;
import app.aurafitbackend.promotion.PromotionRepository;
import app.aurafitbackend.Utils.PromotionValidator;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@AllArgsConstructor
public class DisablePromotionSalesThread extends Thread {

    private ProductVariantRepository productVariantRepository;
    private PromotionRepository promotionRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void clearExpiredPromotions() {

        List<Promotion> expiredPromotions = promotionRepository.findExpiredPromotions();
        expiredPromotions.forEach(promotion -> {
            if (PromotionValidator.isExpiredPromotion(promotion)) {
                ProductVariant variant = promotion.getProductVariant();
                variant.setOnSale(false);
                variant.setSalePrice(BigDecimal.ZERO);
                promotion.setIsActive(false);
                promotionRepository.save(promotion);
                promotionRepository.deleteById(promotion.getId());
                productVariantRepository.save(promotion.getProductVariant());
                System.out.println("Expired Promotions Cleared!");
            }
        });

    }


}
