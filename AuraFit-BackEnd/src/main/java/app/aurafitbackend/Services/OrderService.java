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
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
        orderRepository.save(order);

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
        if (order.getUser() != null) {
            if (!order.getUser().getEmail().equals(principalEmail)) {
                throw new UnauthorizedException("Not your order");
            }
        } else {
            if (!order.getContactInformation().getEmail().equals(principalEmail)) {
                throw new UnauthorizedException("Not your order");
            }
        }
        order.setStatus(Status.CANCELLED);
        orderRepository.save(order);
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
