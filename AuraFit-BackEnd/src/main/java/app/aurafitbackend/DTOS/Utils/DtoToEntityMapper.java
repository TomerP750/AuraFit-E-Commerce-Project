package app.aurafitbackend.DTOS.Utils;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductResponseDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

public final class DtoToEntityMapper {

    private DtoToEntityMapper() {}

    public static Product toEntity(ProductCreateDTO dto) {
        Product p = Product.builder()
                .description(dto.getDescription())
                .category(dto.getCategory())
                .subCategory(dto.getSubCategory())
                .onSale(false)
                .build();

        List<ProductVariant> variants = dto.getVariants().stream()
                .map(vdto -> ProductVariant.builder()
                        .size(vdto.getSize())
                        .color(vdto.getColor())
                        .material(vdto.getMaterial())
                        .price(vdto.getPrice())
                        .stockQuantity(vdto.getStockQuantity())
                        .onSale(false)
                        .product(p)
                        .build())
                .collect(Collectors.toList());

        p.setVariants(variants);
        return p;
    }

    public static ProductResponseDTO toDto(Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId())
                .description(product.getDescription())
                .category(product.getCategory())
                .subCategory(product.getSubCategory())
                .onSale(product.getOnSale())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .variants(product.getVariants().stream()
                        .map(DtoToEntityMapper::variantToDto)
                        .collect(Collectors.toList()))
                .build();
    }

    public static ProductVariantResponseDTO variantToDto(ProductVariant v) {
        return ProductVariantResponseDTO.builder()
                .id(v.getId())
                .sku(v.getSku())
                .size(v.getSize())
                .color(v.getColor())
                .material(v.getMaterial())
                .price(v.getPrice())
                .stockQuantity(v.getStockQuantity())
                .onSale(v.getOnSale())
                .createdAt(v.getCreatedAt())
                .updatedAt(v.getUpdatedAt())
                .build();
    }
}
