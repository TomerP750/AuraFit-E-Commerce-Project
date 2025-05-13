//package app.aurafitbackend.Services;
//
//import app.aurafitbackend.Beans.*;
//import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.CheckoutRequestDTO;
//import app.aurafitbackend.Enums.Status;
//import app.aurafitbackend.Exceptions.NotExistsException;
//import app.aurafitbackend.Exceptions.PurchaseException;
//import app.aurafitbackend.Exceptions.RequestException;
//import app.aurafitbackend.Repositories.*;
//import app.aurafitbackend.Utils.GeneralValidator;
//import app.aurafitbackend.Utils.OrderValidator;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//
//@Service
//@AllArgsConstructor
//public class OrderService {
//
//    private final OrderRepository orderRepository;
//    private final UserRepository userRepository;
//    private final CartRepository cartRepository;
//    private final CartItemRepository cartItemRepository;
//    private final ProductRepository productRepository;
//    private final ProductVariantRepository productVariantRepository;
//    private final PromotionRepository promotionRepository;
//
//
//    public Cart getOrCreateCart(Long userId) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new NotExistsException("User not found"));
//        Cart openCart = cartRepository.findByUserIdAndStatus(user.getId(), Status.PENDING);
//
//        if (openCart != null) {
//            return openCart;
//        }
//
//        Cart newCart = new Cart();
//        newCart.setUser(user);
//        newCart.setStatus(Status.PENDING);
//        newCart.setTotalPrice(BigDecimal.ZERO);
//        return cartRepository.save(newCart);
//    }
//
//
//    @Transactional
//    public Order createOrder(Long userId, CheckoutRequestDTO checkoutRequestDTO) {
//        Cart cart = getOrCreateCart(userId);
//        if (cart.getItems().isEmpty()) {
//            throw new RequestException("Cart is empty, cannot purchase");
//        }
//
//        Order order = cart.getUser() != null ? Order.builder()
//                .user(cart.getUser())
//                .orderDate(LocalDateTime.now())
//                .status(Status.COMPLETED)
//                .orderNumber("ORD-" + UUID.randomUUID())
//                .firstName(checkoutRequestDTO.getFirstName())
//                .lastName(checkoutRequestDTO.getLastName())
//                .email(checkoutRequestDTO.getEmail())
//                .address(checkoutRequestDTO.getAddress())
//                .city(checkoutRequestDTO.getCity())
//                .phone(checkoutRequestDTO.getPhone())
//                .build()
//                : Order.builder()
//                .user(null)
//                .orderDate(LocalDateTime.now())
//                .status(Status.COMPLETED)
//                .orderNumber("ORD-" + UUID.randomUUID())
//                .firstName(checkoutRequestDTO.getFirstName())
//                .lastName(checkoutRequestDTO.getLastName())
//                .email(checkoutRequestDTO.getEmail())
//                .address(checkoutRequestDTO.getAddress())
//                .city(checkoutRequestDTO.getCity())
//                .phone(checkoutRequestDTO.getPhone())
//                .build();
//
//        BigDecimal totalPrice = BigDecimal.ZERO;
//        List<OrderItem> orderItems = new ArrayList<>();
//
//        for (CartItem cartItem : cart.getItems()) {
//            OrderItem orderItem = OrderItem.builder()
//                    .purchasePrice(cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
//                    .quantity(cartItem.getQuantity())
//                    .variant(cartItem.getVariant())
//                    .user(cart.getUser())
//                    .order(order)
//                    .build();
//            orderItems.add(orderItem);
//
//            int newAvailableQuantity = cartItem.getVariant().getStockQuantity() - cartItem.getQuantity();
//            if (newAvailableQuantity < 0) {
//                throw new PurchaseException("Not enough stock available");
//            }
//
//            if (!GeneralValidator.isValidPurchase()) {
//                throw new PurchaseException("Something went wrong");
//            }
//
//            totalPrice = totalPrice.add(cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
//            orderItems.add(orderItem);
//
//        }
//
//        order.setOrderItems(orderItems);
//        order.setTotalPrice(totalPrice);
//        order = orderRepository.save(order);
//
//        orderRepository.save(order);
//
//
//        cart.setStatus(Status.COMPLETED);
//        cartRepository.save(cart);
//        cartItemRepository.deleteByCartId(cart.getId());
//
//        Cart newCart = Cart.builder()
//                .user(cart.getUser())
//                .status(Status.PENDING)
//                .totalPrice(BigDecimal.ZERO)
//                .build();
//        cartRepository.save(newCart);
//
//        return order;
//
//    }
//
//    public void cancelOrder(Long orderId, String email) {
//        Order order = orderRepository.findByIdAndEmail(orderId, email);
//
//        if (OrderValidator.isValidOrderForCancel(order)) {
//
//            for (OrderItem orderItem : order.getOrderItems()) {
//                ProductVariant productVariant = orderItem.getVariant();
//                productVariant.setStockQuantity(productVariant.getStockQuantity() + orderItem.getQuantity());
//                productVariantRepository.save(productVariant);
//            }
//
//
//            order.setStatus(Status.CANCELLED);
//            orderRepository.save(order);
//        }
//
//    }
//
//
//
//
//}
