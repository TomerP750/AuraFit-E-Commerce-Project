package app.aurafitbackend.cart;

import app.aurafitbackend.cart.CartDTOS.AddToCartRequestDTO;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Utils.ShippingPolicy;
import app.aurafitbackend.productVariant.ProductVariant;
import app.aurafitbackend.productVariant.ProductVariantRepository;
import app.aurafitbackend.user.User;
import app.aurafitbackend.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;
    private final ShippingPolicy shippingPolicy;





    /**
     * Returns the user’s pending cart, creating one if needed.
     */
    @Transactional
    public Cart getOrCreateUserCart(Long userId) {
        User user = userRepository.getReferenceById(userId);
        return cartRepository.findByUserIdAndStatus(userId, Status.PENDING)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .user(user)
                                .status(Status.PENDING)
                                .cartToken(null)
                                .subTotal(BigDecimal.ZERO)
                                .shippingCost(BigDecimal.ZERO)
                                .totalCartPrice(BigDecimal.ZERO)
                                .build()
                ));
    }

    /**
     * Returns the guest’s pending cart (by token), creating one if needed.
     */
    @Transactional
    public Cart getOrCreateGuestCart(String incomingToken) {
        // pick or generate the token exactly once
        String tokenToUse = (incomingToken != null && !incomingToken.isBlank())
                ? incomingToken
                : UUID.randomUUID().toString();

        return cartRepository
                .findByCartTokenAndStatus(tokenToUse, Status.PENDING)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .user(null)
                                .status(Status.PENDING)
                                .cartToken(tokenToUse)
                                .subTotal(BigDecimal.ZERO)
                                .shippingCost(BigDecimal.ZERO)
                                .totalCartPrice(BigDecimal.ZERO)
                                .build()
                ));
    }

    /**
     * Adds qty of a variant to the appropriate cart (user or guest).
     * Returns the updated Cart entity.
     */
    @Transactional
    public Cart addToCart(Long userId, AddToCartRequestDTO dto) {
        if (dto == null || dto.getVariantId() == null || dto.getQuantity() < 1) {
            throw new RequestException("Invalid add-to-cart request");
        }
        Cart cart = getOrCreateUserCart(userId);

        return addOrMergeLine(cart, dto);
    }

    @Transactional
    public Cart addToGuestCart(String guestToken, AddToCartRequestDTO dto) {
        if (dto == null || dto.getVariantId() == null || dto.getQuantity() < 1) {
            throw new RequestException("Invalid add-to-cart request");
        }
        Cart cart = getOrCreateGuestCart(guestToken);

        return addOrMergeLine(cart, dto);
    }

    public Cart removeOneQuantityFromCartItem(Long userId, Long cartItemId) {
        Cart cart = getOrCreateUserCart(userId);
        Optional<CartItem> item = cart.getItems().stream().filter(ci -> ci.getId().equals(cartItemId)).findFirst();
        if (item.isPresent()) {
            CartItem cartItem = item.get();
            if (cartItem.getQuantity() > 1) {
                cartItem.setQuantity(cartItem.getQuantity() - 1);
            } else {
                cart.getItems().remove(cartItem);
            }
            recalculateTotals(cart);
            cartRepository.save(cart);
        }
        return cart;
    }

    public Cart removeOneQuantityFromGuestCartItem(String cartToken, Long cartItemId) {
        Cart cart = getOrCreateGuestCart(cartToken);
        Optional<CartItem> item = cart.getItems().stream().filter(ci -> ci.getId().equals(cartItemId)).findFirst();
        if (item.isPresent()) {
            CartItem cartItem = item.get();
            if (cartItem.getQuantity() > 1) {
                cartItem.setQuantity(cartItem.getQuantity() - 1);
            } else {
                cart.getItems().remove(cartItem);
            }
            recalculateTotals(cart);
            cartRepository.save(cart);
        }
        return cart;
    }

    /**
     * Removes one line from the cart, recalculates totals, and returns the updated Cart.
     */
    @Transactional
    public Cart removeFromCart(Long userId, String guestToken, Long cartItemId) {
        Cart cart = (userId != null) ? getOrCreateUserCart(userId) : getOrCreateGuestCart(guestToken);
        return removeLine(cart, cartItemId);
    }

    @Transactional
    public Cart removeFromGuestCart(String guestToken, Long cartItemId) {
        Cart cart = getOrCreateGuestCart(guestToken);
        return removeLine(cart, cartItemId);
    }

    /**
     * Completely empties the given cart (user or guest).
     */
    @Transactional
    public void clearCart(Long userId, String guestToken) {
        Cart cart = (userId != null) ? getOrCreateUserCart(userId) : getOrCreateGuestCart(guestToken);
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        recalculateTotals(cart);
        cartRepository.save(cart);
    }

    /**
     * When a guest registers, merge their guest cart into their new user cart.
     */
    @Transactional
    public void mergeGuestCartIntoUser(Long userId, String guestToken) {
        Cart guestCart = cartRepository
                .findByCartTokenAndStatus(guestToken, Status.PENDING)
                .orElse(null);
        if (guestCart == null) return;

        Cart userCart = cartRepository
                .findByUserIdAndStatus(userId, Status.PENDING)
                .orElseGet(() -> {
                    guestCart.setUser(userRepository.getReferenceById(userId));
                    guestCart.setCartToken(null);
                    return cartRepository.save(guestCart);
                });

        if (userCart != guestCart) {
            for (CartItem item : guestCart.getItems()) {
                addOrMergeLine(userCart,
                        new AddToCartRequestDTO(item.getVariant().getId(), item.getQuantity()));
            }
            cartRepository.delete(guestCart);
        }
    }

    // UTILS

    private Cart addOrMergeLine(Cart cart, AddToCartRequestDTO dto) {
        ProductVariant variant = variantRepository.findById(dto.getVariantId())
                .orElseThrow(() -> new NotExistsException("Variant not found"));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(ci -> ci.getVariant().getId().equals(variant.getId()))
                .findFirst();

        int newQty = dto.getQuantity()
                + existing.map(CartItem::getQuantity).orElse(0);

        if (newQty > variant.getStockQuantity()) {
            throw new RequestException("Insufficient stock");
        }

        if (existing.isPresent()) {
            existing.get().setQuantity(newQty);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .variant(variant)
                    .quantity(dto.getQuantity())
                    .unitPrice(variant.getOnSale() ? variant.getSalePrice() : variant.getBasePrice())
                    .build();
            cart.getItems().add(newItem);
        }

        recalculateTotals(cart);
        return cartRepository.save(cart);
    }


    private Cart removeLine(Cart cart, Long cartItemId) {
        CartItem line = cartItemRepository.findByIdAndCartId(cartItemId, cart.getId());
        if (line == null) {
            throw new NotExistsException("Cart item not found");
        }
        cart.getItems().remove(line);
        cartItemRepository.delete(line);
        recalculateTotals(cart);
        return cartRepository.save(cart);
    }

    private void recalculateTotals(Cart cart) {
        BigDecimal subTotal = cart.getItems().stream()
                .map(ci -> ci.getUnitPrice()
                        .multiply(BigDecimal.valueOf(ci.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_EVEN);

        BigDecimal shippingCost = shippingPolicy.calculate(subTotal);

        cart.setSubTotal(subTotal);
        cart.setShippingCost(shippingCost);
        cart.setTotalCartPrice(subTotal.add(shippingCost).setScale(2, RoundingMode.HALF_EVEN)
        );
    }
}

