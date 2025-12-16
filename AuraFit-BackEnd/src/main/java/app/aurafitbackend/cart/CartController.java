package app.aurafitbackend.cart;

import app.aurafitbackend.cart.CartDTOS.CartDTO;
import app.aurafitbackend.cart.CartDTOS.AddToCartRequestDTO;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Utils.EntityDTOMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.UUID;


@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;


    @PostMapping("/addToCart")
    public CartDTO addToCart(@AuthenticationPrincipal CustomUserDetails userDetails, @CookieValue(value = "cart_token", required = false) String cartToken, @RequestBody AddToCartRequestDTO dto, HttpServletResponse response) {
        Long userId = userDetails.getUser().getId();
        return EntityDTOMapper.toCartDTO(cartService.addToCart(userId, dto));
    }

    @PostMapping("/guest/addToCart")
    public CartDTO addToGuestCart(
            @CookieValue(value = "cart_token", required = false) String cartToken,
            @RequestBody AddToCartRequestDTO dto,
            HttpServletResponse response) {

        // first visit => no cookie yet
        if (!StringUtils.hasText(cartToken)) {
            cartToken = UUID.randomUUID().toString();
        }

        ResponseCookie cookie = ResponseCookie.from("cart_token", cartToken)
                .maxAge(Duration.ofDays(30))
                .httpOnly(true)
//                .sameSite("None")
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return EntityDTOMapper.toCartDTO(
                cartService.addToGuestCart(cartToken, dto));
    }


    @DeleteMapping("/removeItemFromCart/{id}")
    public CartDTO removeItemFromCart(@AuthenticationPrincipal CustomUserDetails userDetails, @CookieValue(value = "cart_token", required = false) String cartToken, @PathVariable Long id) {
        Long userId = (userDetails != null) ? userDetails.getUser().getId() : null;
        Cart updatedCart = cartService.removeFromCart(userId, cartToken, id);
        return EntityDTOMapper.toCartDTO(updatedCart);
    }

    @DeleteMapping("/guest/removeItemFromCart/{id}")
    public CartDTO removeItemFromGuestCart(@CookieValue(value = "cart_token", required = false) String cartToken, @PathVariable Long id) {
        Cart updatedCart = cartService.removeFromGuestCart(cartToken, id);
        return EntityDTOMapper.toCartDTO(updatedCart);
    }


    @PostMapping("/merge")
    public void mergeGuestCartIntoUserCart(@AuthenticationPrincipal CustomUserDetails userDetails, @CookieValue(value = "cart_token", required = false) String cartToken) {
        Long userId = userDetails.getUser().getId();
        cartService.mergeGuestCartIntoUser(userId, cartToken);
    }

    @DeleteMapping("/removeOne/{cartItemId}")
    public CartDTO removeOneQuantityFromCartItem(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long cartItemId) {
        Long userId = userDetails.getUser().getId();
        return EntityDTOMapper.toCartDTO(cartService.removeOneQuantityFromCartItem(userId, cartItemId));
    }

    @DeleteMapping("/guest/removeOne/{cartItemId}")
    public CartDTO removeOneQuantityFromGuestCartItem(@CookieValue(value = "cart_token", required = false) String cartToken, @PathVariable Long cartItemId) {
        return EntityDTOMapper.toCartDTO(cartService.removeOneQuantityFromGuestCartItem(cartToken, cartItemId));
    }

    @GetMapping("/user/get")
    public CartDTO getUserCart(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Cart cart = cartService.getOrCreateUserCart(userDetails.getUser().getId());
        return EntityDTOMapper.toCartDTO(cart);
    }


    @GetMapping("/guest/get")
    public CartDTO getGuestCart(@CookieValue("cart_token") String cartToken) {
        return EntityDTOMapper.toCartDTO(cartService.getOrCreateGuestCart(cartToken));
    }


}
