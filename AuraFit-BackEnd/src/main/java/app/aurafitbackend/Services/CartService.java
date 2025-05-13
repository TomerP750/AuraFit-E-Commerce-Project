package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.AddToCartRequestDTO;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Repositories.*;
import app.aurafitbackend.Utils.ProductValidator;
import app.aurafitbackend.Utils.ShippingPolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final PromotionRepository promotionRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ShippingPolicy shippingPolicy;


    public Cart getOrCreateCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotExistsException("User not found"));
//        Cart openCart = cartRepository.findByUserIdAndStatus(userId, Status.PENDING);

        return cartRepository.findByUserIdAndStatus(userId, Status.PENDING).orElseGet(() -> {
                    Cart cart = Cart.builder()
                            .status(Status.PENDING)
                            .user(user)
                            .totalPrice(BigDecimal.ZERO)
                            .shippingCost(BigDecimal.ZERO)
                            .build();
                    return cartRepository.save(cart);
                });

    }

    public Cart getOrCreateCart(String cartToken) {
        return cartRepository.existsByCartTokenAndStatus(cartToken, Status.PENDING)

    }

    @Transactional
    public Cart addItemToCart(Long userId, AddToCartRequestDTO req) {
        Cart cart = getOrCreateCart(userId);

        ProductVariant variant = productVariantRepository.findById(req.getVariantId())
                .orElseThrow(() -> new NotExistsException("Variant not found"));

        if (!ProductValidator.isValidAddToCart(req)) {
            throw new RequestException("Invalid add-to-cart request");
        }

        Optional<CartItem> existing = cart.getItems()
                .stream()
                .filter(ci -> ci.getVariant().getId().equals(variant.getId()))
                .findFirst();


        if (existing.isPresent()) {
            CartItem cartItem = existing.get();
            int newQty = cartItem.getQuantity() + req.getQuantity();
            if (newQty > variant.getStockQuantity()) {
                throw new RequestException("Insufficient stock");
            }
            cartItem.setQuantity(cartItem.getQuantity() + req.getQuantity());
        } else {

            BigDecimal unitPrice = variant.getOnSale()
                    ? variant.getSalePrice()
                    : variant.getBasePrice();

            CartItem item = CartItem.builder()
                    .quantity(req.getQuantity())
                    .unitPrice(unitPrice)
                    .variant(variant)
                    .cart(cart)
                    .build();

            cart.getItems().add(item);
        }

        recalculateCartSubTotal(cart);

        return cartRepository.save(cart);
    }


    public void removeCartItemFromCart(Long userId, Long cartItemId) {
        Cart cart = getOrCreateCart(userId);

        CartItem cartItem = cartItemRepository
                .findByIdAndCartId(cartItemId, cart.getId());

        if (cartItem == null) {
            throw new NotExistsException("Cart item not found");
        }

        cart.getItems().remove(cartItem);
        recalculateCartSubTotal(cart);

        cartRepository.save(cart);
    }

    //TODO check if works
    public ProductVariant variantExists(Long productId, Size size, Color color) {
        if (productVariantRepository.existsByProductIdAndSizeAndColor(productId ,size, color)) {
            return productVariantRepository.findByProductIdAndSizeAndColor(productId, size, color);
        }
        throw new NotExistsException("Product is unavailable");
    }

    private void recalculateCartSubTotal(Cart cart) {
        BigDecimal itemsTotal = cart.getItems().stream()
                .map(i -> i.getUnitPrice()
                        .multiply(BigDecimal.valueOf(i.getQuantity()))
                        .setScale(2, RoundingMode.HALF_EVEN))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_EVEN);

        BigDecimal shippingCost = shippingPolicy
                .calculate(itemsTotal)
                .setScale(2, RoundingMode.HALF_EVEN);

        cart.setShippingCost(shippingCost);
        cart.setTotalPrice(itemsTotal.add(shippingCost));
    }




}
