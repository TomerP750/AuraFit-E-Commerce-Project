package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.CartDTOS.CartDTO;
import app.aurafitbackend.DTOS.CartDTOS.CartItemDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.UserDTO;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public final class EntityDTOMapper {

    private EntityDTOMapper() {}

    public static Product toEntity(ProductCreateDTO dto) {
        Product p = Product.builder()
                .name(dto.getName())
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
//                .variants(product.getVariants().stream()
//                        .map(EntityDTOMapper::variantToDto)
//                        .collect(Collectors.toList()))
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

    public static ProductVariantDTO toVariantDTO(ProductVariant variant) {
        if (variant == null) return null;

        // build a minimal ProductDTO without nesting variants
        Product product = variant.getProduct();
        ProductDTO productDto = ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory())
                .gender(product.getGender())
                .productType(product.getProductType())
                .onSale(product.getOnSale())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                // no .variants(...) here!
                .build();

        return ProductVariantDTO.builder()
                .id(variant.getId())
                .sku(variant.getSku())
                .size(variant.getSize())
                .color(variant.getColor())
                .materials(variant.getMaterial())
                .basePrice(variant.getBasePrice())
                .salePrice(variant.getSalePrice())
                .stockQuantity(variant.getStockQuantity())
                .onSale(variant.getOnSale())
                .product(productDto)
                .build();
    }



    public static ProductDTO toProductDTO(Product product) {
        if (product == null) return null;
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory())
                .gender(product.getGender())
                .productType(product.getProductType())
                .onSale(product.getOnSale())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
//                .variants(product.getVariants().stream()
//                        .map(EntityDTOMapper::toVariantDTO)
//                        .collect(Collectors.toList()))
                .build();
    }


    public static CartItemDTO toCartItemDTO(CartItem item, Long cartId) {
        if (item == null) return null;
        return CartItemDTO.builder()
                .id(item.getId())
                .variant(toVariantDTO(item.getVariant()))
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .cartId(cartId)
                .build();
    }

    public static CartDTO toCartDTO(Cart cart) {
        if (cart == null) return null;

        // 1) Map each CartItem → CartItemDTO, passing in the cart’s ID
        List<CartItemDTO> items = cart.getItems().stream()
                .map(item -> toCartItemDTO(item, cart.getId()))
                .collect(Collectors.toList());

        // 2) Build your CartDTO with that flat list of CartItemDTOs
        return CartDTO.builder()
                .id(cart.getId())
                .items(items)
                .shippingCost(cart.getShippingCost())
                .totalPrice(cart.getTotalPrice())
                .status(cart.getStatus())
                .userId(cart.getUser() != null ? cart.getUser().getId() : null)
                .cartToken(cart.getCartToken())
                .build();
    }
}
