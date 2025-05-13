package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.CartDTOS.CartDTO;
import app.aurafitbackend.DTOS.CartDTOS.CartItemDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.CheckoutRequestDTO;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.PurchaseException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Exceptions.UnauthorizedException;
import app.aurafitbackend.Repositories.*;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Utils.GeneralValidator;
import app.aurafitbackend.Utils.OrderValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final PromotionRepository promotionRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartService cartService;


    public List<Order> getUserOrderHistory(Long userId){
        return orderRepository.findByUserId(userId);
    }


    /**
     * Place an order for a registered user.
     */
    @Transactional
    public Order placeOrderForUser(Long userId, CheckoutRequestDTO dto) {
        // 1) load user & their pending cart
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotExistsException("User not found"));
        Cart cart = cartService.getOrCreateUserCart(userId);

        // 2) build & save basic Order (to get an ID)
        Order order = Order.builder()
                .orderNumber("ORD-" + UUID.randomUUID())
                .user(user)
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .city(dto.getCity())
                .postalCode(dto.getPostalCode())
                .totalPrice(cart.getTotalCartPrice())
                .status(Status.COMPLETED)
                .build();
        order = orderRepository.save(order);

        // 3) map cart lines → order items
        List<OrderItem> items = mapCartItemsToOrderItems(order, cart.getItems());
        orderItemRepository.saveAll(items);

        // 4) attach items & finalize
        order.setOrderItems(items);
        order = orderRepository.save(order);

        // 5) clear the user’s cart
        cartService.clearCart(userId, null);

        return order;
    }

    /**
     * Place an order for a guest (by cartToken).
     */
    @Transactional
    public Order placeOrderForGuest(CheckoutRequestDTO dto, String guestToken) {
        // 1) load guest cart
        Cart cart = cartService.getOrCreateGuestCart(guestToken);

        // 2) build & save basic Order
        Order order = Order.builder()
                .orderNumber("ORD-" + UUID.randomUUID())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .city(dto.getCity())
                .postalCode(dto.getPostalCode())
                .totalPrice(cart.getTotalCartPrice())
                .status(Status.COMPLETED)
                .build();
        order = orderRepository.save(order);

        List<OrderItem> items = mapCartItemsToOrderItems(order, cart.getItems());
        orderItemRepository.saveAll(items);

        order.setOrderItems(items);
        order = orderRepository.save(order);

        cartService.clearCart(null, guestToken);

        return order;
    }

    /**
     * Facade: decide between user or guest checkout.
     */
    public Order placeOrder(Long userId, CheckoutRequestDTO dto, String guestToken) {
        if (userId != null) {
            return placeOrderForUser(userId, dto);
        } else {
            return placeOrderForGuest(dto, guestToken);
        }
    }

    /**
     * Cancel an existing order, enforcing that only the owner (user or guest email) can cancel.
     */
    @Transactional
    public void cancelOrder(Long orderId, String principalEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotExistsException("Order not found"));

        // check ownership
        if (order.getUser() != null) {
            if (!order.getUser().getEmail().equals(principalEmail)) {
                throw new UnauthorizedException("Not your order");
            }
        } else {
            if (!order.getEmail().equals(principalEmail)) {
                throw new UnauthorizedException("Not your order");
            }
        }

        order.setStatus(Status.CANCELLED);
        orderRepository.save(order);
    }

    // UTIL METHODS

    /**
     * Turn each CartItem into an OrderItem, preserving pricing and variant link.
     */
    private List<OrderItem> mapCartItemsToOrderItems(Order order, List<CartItem> cartItems) {
        return cartItems.stream()
                .map(ci -> {
                    // ensure variant still exists
                    ProductVariant variant = productVariantRepository.findById(ci.getVariant().getId())
                            .orElseThrow(() -> new NotExistsException("Variant not found"));
                    return OrderItem.builder()
                            .order(order)
                            .variant(variant)
                            .quantity(ci.getQuantity())
                            .unitPrice(ci.getUnitPrice())
                            .totalPrice(
                                    ci.getUnitPrice()
                                            .multiply(BigDecimal.valueOf(ci.getQuantity()))
                            )
                            .build();
                })
                .collect(Collectors.toList());
    }




}
