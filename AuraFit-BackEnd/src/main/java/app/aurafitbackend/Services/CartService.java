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
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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


    public Cart getOrCreateCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new NotExistsException("User not found"));
        Cart openCart = cartRepository.findByUserIdAndStatus(userId, Status.PENDING);

        if (openCart != null) {
            return openCart;
        }

        Cart cart = Cart.builder()
                .status(Status.PENDING)
                .user(user)
                .totalPrice(BigDecimal.ZERO)
                .build();
        return cartRepository.save(cart);

    }

    public Cart addItemToCart(Long userId, AddToCartRequestDTO addToCartRequest) {

//        TODO add Validations

        Cart cart = getOrCreateCart(userId);
        ProductVariant variant = productVariantRepository.findById(addToCartRequest.getVariantId()).orElseThrow(()->new NotExistsException("Variant not found"));
        if (!ProductValidator.isValidAddToCart(addToCartRequest)) {
            throw new RequestException("Something went wrong");
        }


        CartItem cartItem = CartItem.builder()
                .quantity(addToCartRequest.getQuantity())
                .variant(variant)
                .unitPrice(variant.getOnSale() ? variant.getSalePrice() : variant.getBasePrice())
                .cart(cart)
                .build();

        cart.getItems().add(cartItem);
        cart.setTotalPrice(cart.getTotalPrice().add(cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()))));

        return cartRepository.save(cart);

    }


    public Cart removeCartItemFromCart(Long userId, Long cartItemId) {
        Cart cart = getOrCreateCart(userId);

        CartItem cartItem = cartItemRepository.findByIdAndCartId(cartItemId,cart.getId());

        BigDecimal totalToSubtract = cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));


        if (cartItem == null) {
            throw new NotExistsException("Cart item not found");
        }

        cart.setTotalPrice(cart.getTotalPrice().subtract(totalToSubtract));
        cart.getItems().remove(cartItem);

        return cartRepository.save(cart);
    }

    public int getCartItemCount(Long userId) {
        Cart cart = getOrCreateCart(userId);
        if (cart == null) {
            return 0;
        }
        return cart.getItems().size();
    }

    public List<CartItem> getCartItemsFromCart(Long cartId) {
        return cartItemRepository.cartItemsFromCart(cartId);
    }




}
