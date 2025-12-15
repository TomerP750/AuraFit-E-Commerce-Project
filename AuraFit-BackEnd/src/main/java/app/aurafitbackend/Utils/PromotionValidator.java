package app.aurafitbackend.Utils;

import app.aurafitbackend.promotion.Promotion;
import app.aurafitbackend.promotion.CreatePromotionByProductDTO;
import app.aurafitbackend.promotion.CreatePromotionDTO;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.promotion.PromotionRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PromotionValidator {

    private static PromotionRepository promotionRepository;

    private PromotionValidator(PromotionRepository promotionRepository) {
        PromotionValidator.promotionRepository = promotionRepository;
    }

    public static boolean isValidNewPromotion(CreatePromotionDTO promotion) {
        if (promotion.getDiscountPercent() < 0 || promotion.getDiscountPercent() > 100) {
            throw new InvalidInputException("Invalid discount percent");
        }
        if (promotion.getStartTime().isAfter(promotion.getEndTime())) {
            throw new InvalidInputException("Start time is after end time");
        }
        if (promotion.getEndTime().isBefore(promotion.getStartTime())) {
            throw new InvalidInputException("End time is after start time");
        }
        return true;
    }

    public static boolean isExpiredPromotion(Promotion promotion) {
        LocalDateTime now = LocalDateTime.now();
        return promotion.getEndTime().isBefore(now);
    }

    public static boolean isValidProductPromotionsCreate(CreatePromotionByProductDTO dto) {
        if (dto.getDiscountPercent() < 0 || dto.getDiscountPercent() > 100) {
            throw new InvalidInputException("Invalid discount percent");
        }
        if (dto.getStartTime().isAfter(dto.getEndTime())) {
            throw new InvalidInputException("Start time is after end time");
        }
        if (dto.getEndTime().isBefore(dto.getStartTime())) {
            throw new InvalidInputException("End time is after start time");
        }
        return true;
    }
}
