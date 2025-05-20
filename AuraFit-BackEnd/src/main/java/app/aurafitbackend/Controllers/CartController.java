package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Cart;
import app.aurafitbackend.DTOS.CartDTOS.CartDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.AddToCartRequestDTO;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.CartService;
import app.aurafitbackend.Utils.EntityDTOMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
//        Long userId = (userDetails != null) ? userDetails.getUser().getId() : null;
//        System.out.println(dto);
//        if (userId == null && (cartToken == null || cartToken.isBlank())) {
//            cartToken = UUID.randomUUID().toString();
//            ResponseCookie cookie = ResponseCookie.from("cart_token", cartToken)
//                    .maxAge(Duration.ofDays(30))
//                    .httpOnly(true)
//                    .sameSite("Lax")
//                    .path("/")
//                    .build();
//            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//        }
//
//        return cartService.addToCart(userId, cartToken, dto);
        Cart updated = cartService.addToCart(userDetails.getUser().getId(), null, dto);
        return EntityDTOMapper.toCartDTO(updated);
    }

    @DeleteMapping("/removeItemFromCart/{id}")
    public CartDTO removeItemFromCart(@AuthenticationPrincipal CustomUserDetails userDetails, @CookieValue(value = "cart_token", required = false) String cartToken, @PathVariable Long id) {
        Long userId = (userDetails != null) ? userDetails.getUser().getId() : null;
        Cart updatedCart = cartService.removeFromCart(userId, cartToken, id);
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

    @GetMapping("/user/get")
    public CartDTO getUserCart(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Cart cart = cartService.getOrCreateUserCart(userDetails.getUser().getId());
        return EntityDTOMapper.toCartDTO(cart);
    }
    //TODO add a react cookie library
    @GetMapping("/guest/get")
    public Cart getGuestCart(@CookieValue("cart_token") String cartToken) {
        return cartService.getOrCreateGuestCart(cartToken);
    }



}
