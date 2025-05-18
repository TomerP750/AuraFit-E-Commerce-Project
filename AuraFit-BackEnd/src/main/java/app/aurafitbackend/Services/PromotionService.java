package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Promotion;
import app.aurafitbackend.DTOS.CreateDTOS.CreatePromotionByProductDTO;
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
import java.util.List;

@Service
@AllArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;
    private final ProductVariantRepository productVariantRepository;

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }


    @Transactional
    public void createPromotionForOneVariant(CreatePromotionDTO dto) {
        if (PromotionValidator.isValidNewPromotion(dto)) {
            ProductVariant variant = productVariantRepository.findById(dto.getProductVariant().getId()).orElseThrow(()->new NotExistsException("Variant not found"));
            Promotion newPromotion = buildPromotion(variant, dto);
            promotionRepository.save(newPromotion);

            BigDecimal salePrice = calculateSalePrice(variant, newPromotion);
            variant.setOnSale(true);
            variant.setSalePrice(salePrice);

            productVariantRepository.save(variant);

        }
    }

    public void updatePromotion() {

    }

    public void createPromotionsByProductId(CreatePromotionByProductDTO dto) {
        if (PromotionValidator.isValidProductPromotionsCreate(dto)) {
            List<ProductVariant> variants = productVariantRepository.findByProductId(dto.getProductId());
            variants.forEach(variant -> {
                if (variant.getOnSale()) {
                    variant.setOnSale(false);
                    variant.setSalePrice(BigDecimal.ZERO);
                    productVariantRepository.save(variant);
                }
                Promotion promotion = Promotion.builder()
                        .productVariant(variant)
                        .name(dto.getName())
                        .startTime(dto.getStartTime())
                        .endTime(dto.getEndTime())
                        .isActive(true)
                        .discountPercent(dto.getDiscountPercent())
                        .build();
                promotionRepository.save(promotion);

                variant.setOnSale(true);
                variant.setSalePrice(calculateSalePrice(variant, promotion));
                productVariantRepository.save(variant);
            });

        }

    }

    public void deleteOnePromotion(Long promotionId) {
        Promotion promotion = promotionRepository.findById(promotionId).orElseThrow(()->new NotExistsException("Promotion not found"));
        ProductVariant variantFromPromotion = promotion.getProductVariant();
        variantFromPromotion.setOnSale(false);
        promotionRepository.deleteById(promotionId);
        productVariantRepository.save(variantFromPromotion);
    }

    public void deleteAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();
        promotions.forEach(promotion -> {
            promotion.getProductVariant().setOnSale(false);
            productVariantRepository.save(promotion.getProductVariant());
        });
        promotionRepository.deleteAll();
    }

    public void deletePromotionsByProductId(Long productId) {
        List<ProductVariant> variants = productVariantRepository.findByProductId(productId);
        variants.forEach(variant -> productVariantRepository.deleteById(variant.getId()));
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
