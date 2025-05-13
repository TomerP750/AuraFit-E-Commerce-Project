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


    public static UserDTO userEntityToDto(User user) {
        return UserDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }


    public static CartItemDTO toDto(CartItem item) {
        return CartItemDTO.builder()
                .id(item.getId())
                .cartId(item.getCart().getId())
                .unitPrice(item.getUnitPrice())
                .quantity(item.getQuantity())
                .variantId(item.getVariant().getId())
                .build();
    }

    public static CartDTO toDto(Cart cart) {
        return CartDTO.builder()
                .id(cart.getId())
                .items(cart.getItems().stream()
                        .map(EntityDTOMapper::toDto)      // or CartItemDTO::toDto if it's a static there
                        .collect(Collectors.toList())
                )
                .shippingCost(cart.getShippingCost())
                .totalPrice(cart.getTotalPrice())
                .status(cart.getStatus())
                .userId(cart.getUser() != null
                        ? cart.getUser().getId()
                        : null
                )
                .cartToken(cart.getCartToken())
                .build();
    }
}
