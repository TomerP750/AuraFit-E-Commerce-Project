package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Promotion;
import app.aurafitbackend.DTOS.CreateDTOS.CreatePromotionDTO;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.PromotionRepository;
import app.aurafitbackend.Utils.PromotionValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@AllArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;
    private final ProductVariantRepository productVariantRepository;


    @Transactional
    public void createPromotionForOneVariant(CreatePromotionDTO dto) {
        if (PromotionValidator.isValidNewPromotion(dto)) {
            ProductVariant variant = productVariantRepository.findById(dto.getProductVariant().getId()).orElseThrow(()->new NotExistsException("Variant not found"));
            Promotion newPromotion = buildPromotion(variant, dto);
            promotionRepository.save(newPromotion);

            BigDecimal salePrice = calculateSalePrice(variant, newPromotion);
            variant.setOnSale(true);
            variant.setSalePrice(salePrice);

            // 6) Persist the variant update
            productVariantRepository.save(variant);

        }
    }

    public void createPromotionsByProductId(Long productId, CreatePromotionDTO dto) {

    }







    private BigDecimal calculateSalePrice(ProductVariant productVariant, Promotion promotion) {

        BigDecimal basePrice = productVariant.getBasePrice();
        BigDecimal percent = BigDecimal.valueOf(promotion.getDiscountPercent());

        BigDecimal discountAmount = basePrice.multiply(percent).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        // salePrice = basePrice - discountAmount
        return basePrice.subtract(discountAmount).setScale(2, RoundingMode.HALF_UP);

    }

    private Promotion buildPromotion(ProductVariant productVariant ,CreatePromotionDTO dto) {
        return Promotion.builder()
                .isActive(true)
                .discountPercent(dto.getDiscountPercent())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .name(dto.getName())
                .productVariant(productVariant)
                .build();
    }


}
