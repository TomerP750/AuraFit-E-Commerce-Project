package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;

import java.util.ArrayList;
import java.util.stream.Collectors;

public final class EntityDTOMapper {

    private EntityDTOMapper() {}

    public static Product toEntity(ProductCreateDTO dto) {
        Product p = Product.builder()
                .description(dto.getDescription())
                .category(dto.getCategory())
                .productType(dto.getProductType())
                .gender(dto.getGender())
                .onSale(false)
                .variants(new ArrayList<>())
                .reviews(new ArrayList<>())
                .build();
        return p;
    }

    public static ProductDTO toDto(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .description(product.getDescription())
                .category(product.getCategory())
                .productType(product.getProductType())
                .onSale(product.getOnSale())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .variants(product.getVariants().stream()
                        .map(EntityDTOMapper::variantToDto)
                        .collect(Collectors.toList()))
                .build();
    }

    public static ProductVariantDTO variantToDto(ProductVariant v) {
        return ProductVariantDTO.builder()
                .id(v.getId())
                .sku(v.getSku())
                .size(v.getSize())
                .color(v.getColor())
                .materials(v.getMaterial())
                .basePrice(v.getBasePrice())
                .salePrice(v.getSalePrice())
                .stockQuantity(v.getStockQuantity())
                .onSale(v.getOnSale())
                .build();
    }
}
