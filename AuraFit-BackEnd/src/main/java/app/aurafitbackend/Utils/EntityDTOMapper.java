package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.CartDTOS.CartDTO;
import app.aurafitbackend.DTOS.CartDTOS.CartItemDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.OrderItemResponseDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.OrderResponseDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.UserDTO;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;

import java.math.BigDecimal;
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
//                .onSale(false)
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
//                .onSale(product.getOnSale())
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
                .product(toProductDTO(v.getProduct()))
                .onSale(v.getOnSale())
                .createdAt(v.getCreatedAt())
                .updatedAt(v.getUpdatedAt())
                .images(v.getProductImages())
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
//                .onSale(product.getOnSale())
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
                .createdAt(variant.getCreatedAt())
                .updatedAt(variant.getUpdatedAt())
                .images(variant.getProductImages())
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
//                .onSale(product.getOnSale())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .variants(product.getVariants().stream()
                        .map(EntityDTOMapper::toVariantDTO)
                        .collect(Collectors.toList()))
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

        List<CartItemDTO> items = cart.getItems().stream()
                .map(item -> toCartItemDTO(item, cart.getId()))
                .collect(Collectors.toList());

        return CartDTO.builder()
                .id(cart.getId())
                .items(items)
                .subTotal(cart.getSubTotal())
                .shippingCost(cart.getShippingCost())
                .totalCartPrice(cart.getTotalCartPrice())
                .status(cart.getStatus())
                .userId(cart.getUser() != null ? cart.getUser().getId() : null)
                .cartToken(cart.getCartToken())
                .build();
    }


    public static List<OrderResponseDTO> toOrdersListDTOS(List<Order> orders) {
        return orders.stream()
                .map(order -> OrderResponseDTO.builder()
                        .id(order.getId())
                        .orderNumber(order.getOrderNumber())
                        .orderDate(order.getOrderDate())
                        .contactInformation(order.getContactInformation())
                        .totalPrice(order.getTotalPrice())
                        .status(order.getStatus())
                        // use the helper to map the items:
                        .orderItems(toOrderItemResponseDTOS(order.getOrderItems()))
                        .build()
                )
                .collect(Collectors.toList());
    }

    private static List<OrderItemResponseDTO> toOrderItemResponseDTOS(List<OrderItem> orderItems) {
        return orderItems.stream()
                .map(item -> OrderItemResponseDTO.builder()
                        .id(item.getId())
//                        .variant(item.getVariant())
                        .variant(toVariantDTO(item.getVariant()))
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        // compute totalPrice = unitPrice * quantity
                        .totalPrice(
                                item.getUnitPrice()
                                        .multiply(BigDecimal.valueOf(item.getQuantity()))
                                        .intValue()
                        )
                        .build()
                )
                .collect(Collectors.toList());
    }


    public static OrderResponseDTO toOrderResponseDTO(Order order) {

        return OrderResponseDTO.builder()
                .id(order.getId())
                .contactInformation(order.getContactInformation())
                .totalPrice(order.getTotalPrice())
                .orderItems(toOrderItemResponseDTOS(order.getOrderItems()))
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .orderNumber(order.getOrderNumber())
                .build();

    }



}
