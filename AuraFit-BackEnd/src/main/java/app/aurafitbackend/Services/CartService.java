package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Cart;
import app.aurafitbackend.Beans.CartItem;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.AddToCartRequestDTO;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Repositories.*;
import app.aurafitbackend.Utils.ProductValidator;
import app.aurafitbackend.Utils.ShippingPolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

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
        Cart openCart = cartRepository.findByUserIdAndStatus(userId, Status.PENDING);

        if (openCart != null) {
            return openCart;
        }

        Cart cart = Cart.builder()
                .status(Status.PENDING)
                .user(user)
                .totalPrice(BigDecimal.ZERO)
                .shippingCost(BigDecimal.ZERO)
                .build();
        return cartRepository.save(cart);

    }

    public Cart addItemToCart(Long userId, AddToCartRequestDTO req) {
        Cart cart = getOrCreateCart(userId);

        ProductVariant variant = productVariantRepository.findById(req.getVariantId())
                .orElseThrow(() -> new NotExistsException("Variant not found"));

        if (!ProductValidator.isValidAddToCart(req)) {
            throw new RequestException("Invalid add-to-cart request");
        }

        BigDecimal unitPrice = variant.getOnSale()
                ? variant.getSalePrice()
                : variant.getBasePrice();

        CartItem item = CartItem.builder()
                .quantity(req.getQuantity())
                .unitPrice(unitPrice.setScale(2, RoundingMode.HALF_EVEN))
                .variant(variant)
                .cart(cart)
                .build();

        cart.getItems().add(item);

        // Recompute items total
        BigDecimal itemsTotal = cart.getItems().stream()
                .map(i -> i.getUnitPrice()
                        .multiply(BigDecimal.valueOf(i.getQuantity()))
                        .setScale(2, RoundingMode.HALF_EVEN))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Apply shipping policy
        BigDecimal shippingCost = shippingPolicy.calculate(itemsTotal);

        cart.setShippingCost(shippingCost);
        cart.setTotalPrice(itemsTotal.add(shippingCost));

        return cartRepository.save(cart);
    }


    public Cart removeCartItemFromCart(Long userId, Long cartItemId) {
        Cart cart = getOrCreateCart(userId);

        CartItem cartItem = cartItemRepository.findByIdAndCartId(cartItemId, cart.getId());

        BigDecimal totalToSubtract = cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));


        if (cartItem == null) {
            throw new NotExistsException("Cart item not found");
        }

        cart.setTotalPrice(cart.getTotalPrice().subtract(totalToSubtract));
        cart.getItems().remove(cartItem);

        return cartRepository.save(cart);
    }

//    public int getCartItemCount(Long userId) {
//        Cart cart = getOrCreateCart(userId);
//        if (cart == null) {
//            return 0;
//        }
//        return cart.getItems().size();
//    }
//
//    public List<CartItem> getCartItemsFromCart(Long cartId) {
//        return cartItemRepository.cartItemsFromCart(cartId);
//    }


}
