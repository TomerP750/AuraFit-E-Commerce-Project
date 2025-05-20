package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.ContactInformationDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.OrderResponseDTO;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Exceptions.UnauthorizedException;
import app.aurafitbackend.Repositories.*;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Utils.OrderValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
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
//    private final PaymentDetailRepository paymentDetailRepository;
//    private final ContactInformationRepository contactInformationRepository;


    public List<OrderResponseDTO> getUserOrderHistory(Long userId) {
        return EntityDTOMapper.toOrdersListDTOS(orderRepository.findByUserId(userId));
    }


    @Transactional
    public Order placeOrderForUser(Long userId, ContactInformation contactInformation) {

        Cart cart = cartService.getOrCreateUserCart(userId);

        // build & persist the order
        Order order = buildOrder(contactInformation, cart);
        List<OrderItem> orderItems = mapCartItemsToOrderItems(order, cart.getItems());
        order.setOrderItems(orderItems);
        User user = cart.getUser();
        user.setMembershipPoints(
                user.getMembershipPoints()
                        + order.getTotalPrice()
                        .multiply(BigDecimal.valueOf(10))
                        .divide(BigDecimal.valueOf(100), RoundingMode.DOWN)
                        .intValue()
        );
        userRepository.save(user);
        orderRepository.save(order);

        orderItems.forEach(orderItem -> {
            ProductVariant variant = orderItem.getVariant();
            if (variant.getStockQuantity() - orderItem.getQuantity() <= 0) {
                throw new RequestException("Insufficient Stock");
            }
            variant.setStockQuantity(variant.getStockQuantity() - orderItem.getQuantity());
            productVariantRepository.save(variant);
        });

        cartRepository.delete(cart);

        // create a fresh empty cart for the user
        cartService.getOrCreateUserCart(userId);

        return order;
    }


    @Transactional
    public Order placeOrderForGuest(String cartToken ,ContactInformation contactInformation) {
        Cart cart = cartService.getOrCreateGuestCart(cartToken);

        Order order = buildOrder(contactInformation, cart);
        List<OrderItem> orderItems = mapCartItemsToOrderItems(order, cart.getItems());
        orderItemRepository.saveAll(orderItems);

        orderItems.forEach(orderItem -> {
            ProductVariant variant = orderItem.getVariant();
            //TODO what if two customer purchase same time make it lock
            if (variant.getStockQuantity() - orderItem.getQuantity() <= 0) {
                throw new RequestException("Insufficient Stock");
            }
            variant.setStockQuantity(variant.getStockQuantity() - orderItem.getQuantity());
            productVariantRepository.save(variant);
        });


        order.setOrderItems(orderItems);
        return orderRepository.save(order);
    }


    private List<OrderItem> mapCartItemsToOrderItems(Order order, List<CartItem> cartItems) {

        return cartItems.stream()
                .map(ci -> OrderItem.builder()
                        .order(order)
                        .variant(ci.getVariant())
                        .unitPrice(ci.getUnitPrice())
                        .quantity(ci.getQuantity())
                        .totalPrice(ci.getUnitPrice()
                                .multiply(BigDecimal.valueOf(ci.getQuantity())))
                        .build())
                .collect(Collectors.toList());

    }

    @Transactional
    public void cancelOrder(Long orderId, String principalEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotExistsException("Order not found"));
        if (OrderValidator.isValidOrderForCancel(order, principalEmail)) {
            order.setStatus(Status.CANCELLED);
            orderRepository.save(order);
        }
    }


    private Order buildOrder(ContactInformation contactInformation, Cart cart) {

        LocalDateTime now = LocalDateTime.now();

        Order order = Order.builder()
                .orderDate(now)
                .user(cart.getUser())
                .contactInformation(contactInformation)
                .shippingCost(cart.getShippingCost())
                .subTotal(cart.getSubTotal())
                .totalPrice(cart.getTotalCartPrice())
                .orderNumber("AF-ORD" + UUID.randomUUID())
                .status(Status.COMPLETED)
//                .paymentDetails(null)
                .build();
        return orderRepository.save(order);


    }

}
