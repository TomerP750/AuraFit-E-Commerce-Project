package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.*;
import app.aurafitbackend.DTOS.CartDTOS.CartDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.AddToCartRequestDTO;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Repositories.*;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Utils.ProductValidator;
import app.aurafitbackend.Utils.ShippingPolicy;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

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


    private Cart getOrCreateUserCart(Long userId) {
        User user = userRepository.getReferenceById(userId);

        return cartRepository.findByUserIdAndStatus(userId, Status.PENDING)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .status(Status.PENDING)
                                .user(user)
                                .totalPrice(BigDecimal.ZERO)
                                .shippingCost(BigDecimal.ZERO)
                                .cartToken(null)
                                .build()));
    }

    private Cart getOrCreateGuestCart(String token) {
        return cartRepository.findByCartTokenAndStatus(token, Status.PENDING)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .status(Status.PENDING)
                                .cartToken(token)
                                .totalPrice(BigDecimal.ZERO)
                                .shippingCost(BigDecimal.ZERO)
                                .build()));
    }

    private Cart addItemToGuestCart(String cartToken, AddToCartRequestDTO dto) {

        if (!ProductValidator.isValidAddToCart(dto))
            throw new RequestException("Invalid add-to-cart request");

        if (cartToken == null || cartToken.isBlank())
            throw new RequestException("Missing cart token");


        Cart cart = getOrCreateGuestCart(cartToken);
        return addOrMergeLine(cart, dto);
    }

    private Cart addItemToUserCart(Long userId ,AddToCartRequestDTO dto) {

        if (!ProductValidator.isValidAddToCart(dto))
            throw new RequestException("Invalid add-to-cart request");

        Cart cart = getOrCreateUserCart(userId);
        System.out.println("service cart " + cart);
        System.out.println("service dto" + dto);
        return addOrMergeLine(cart, dto);
    }

    /**
     * This is when guest is register, and added cartitems to cart before registration, so the cartitems will move to his user cart.
     * @param cartToken
     * @param userId
     */
    @Transactional
    public void mergeGuestCartIntoUser(Long userId ,String cartToken) {
        Cart guestCart = cartRepository.findByCartTokenAndStatus(cartToken, Status.PENDING)
                .orElse(null);
        if (guestCart == null) return;

        Cart userCart = cartRepository.findByUserIdAndStatus(userId, Status.PENDING)
                .orElse(null);

        if (userCart == null) {
            guestCart.setUser(userRepository.getReferenceById(userId));
            guestCart.setCartToken(null);
            cartRepository.save(guestCart);
        } else {
            guestCart.getItems().forEach(i ->
                    addItemToUserCart(userId, new AddToCartRequestDTO(i.getVariant().getId(), i.getQuantity())));
        }
    }

    /**
     *
     * @param userId
     * @param cartToken
     * @param dto
     * @return
     */
    @Transactional
    public CartDTO addItemToCart(Long userId, String cartToken, AddToCartRequestDTO dto) {
        if (!ProductValidator.isValidAddToCart(dto)) {
            throw new RequestException("Invalid add-to-cart request");
        }

        Cart cart;
        if (userId != null) {
            // logged-in user → merge into their cart, then stop
            cart = addItemToUserCart(userId, dto);
        } else {
            // guest → must have a token
            if (cartToken == null || cartToken.isBlank()) {
                throw new RequestException("Missing cart token");
            }
            cart = addItemToGuestCart(cartToken, dto);
        }

        // finally map to DTO
        return EntityDTOMapper.toDto(cart);

    }

    /**
     * This does that if you add to cart an exists item in the cart, it will increase the quantity and not add new cartitem
     * @param cart
     * @param dto
     * @return
     */

    private Cart addOrMergeLine(Cart cart, AddToCartRequestDTO dto) {

        ProductVariant variant = productVariantRepository.findById(dto.getVariantId())
                .orElseThrow(() -> new NotExistsException("Variant not found"));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(ci -> ci.getVariant().getId().equals(variant.getId()))
                .findFirst();

        int newQty = dto.getQuantity() + existing.map(CartItem::getQuantity).orElse(0);
        if (newQty > variant.getStockQuantity())
            throw new RequestException("Insufficient stock");

        if (existing.isPresent()) {
            existing.get().setQuantity(newQty);
        } else {
            cart.getItems().add(CartItem.builder()
                    .quantity(dto.getQuantity())
                    .unitPrice(variant.getOnSale() ? variant.getSalePrice() : variant.getBasePrice())
                    .variant(variant)
                    .cart(cart)
                    .build());
        }

        recalculateCartSubTotal(cart);
        return cartRepository.save(cart);
    }


    private Cart removeCartItemFromGuestCart(Long cartItemId, String cartToken) {
        Cart cart = getOrCreateGuestCart(cartToken);

        CartItem line = cartItemRepository.findByIdAndCartId(cartItemId, cart.getId());
        if (line == null)
            throw new NotExistsException("Cart item not found");

        cart.getItems().remove(line);
        recalculateCartSubTotal(cart);
        return cartRepository.save(cart);
    }


    private Cart removeCartItemFromUserCart(Long userId, Long cartItemId) {
        Cart cart = getOrCreateUserCart(userId);

        CartItem line = cartItemRepository.findByIdAndCartId(cartItemId, cart.getId());
        if (line == null)
            throw new NotExistsException("Cart item not found");

        cart.getItems().remove(line);
        recalculateCartSubTotal(cart);

        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeItem(Long userId, String cartToken, Long cartItemId) {

        if (userId != null) {
            return removeCartItemFromUserCart(userId, cartItemId);
        }
        if (cartToken != null && !cartToken.isBlank()) {
            return removeCartItemFromGuestCart(cartItemId, cartToken);
        }
        throw new RequestException("No cart to modify");
    }



    private void recalculateCartSubTotal(Cart cart) {
        BigDecimal itemsTotal = cart.getItems().stream()
                .map(i -> i.getUnitPrice()
                        .multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_EVEN);

        BigDecimal shippingCost = shippingPolicy
                .calculate(itemsTotal)
                .setScale(2, RoundingMode.HALF_EVEN);

        cart.setShippingCost(shippingCost);
        cart.setTotalPrice(itemsTotal.add(shippingCost));
    }




}
