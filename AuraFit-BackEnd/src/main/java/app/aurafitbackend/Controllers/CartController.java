package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Cart;
import app.aurafitbackend.DTOS.CartDTOS.CartDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.AddToCartRequestDTO;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.CartService;
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
        Long userId = (userDetails != null) ? userDetails.getUser().getId() : null;
        System.out.println(dto);
        if (userId == null && (cartToken == null || cartToken.isBlank())) {
            cartToken = UUID.randomUUID().toString();
            ResponseCookie cookie = ResponseCookie.from("cart_token", cartToken)
                    .maxAge(Duration.ofDays(30))
                    .httpOnly(true)
                    .sameSite("Lax")
                    .path("/")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        return cartService.addItemToCart(userId, cartToken, dto);
    }

    @DeleteMapping("/removeItemFromCart/{id}")
    public Cart removeItemFromCart(@AuthenticationPrincipal CustomUserDetails userDetails, @CookieValue(value = "cart_token", required = false) String cartToken ,@PathVariable Long id) {
        Long userId = userDetails.getUser().getId();
        return cartService.removeItem(userId, cartToken, id);
    }

    @PostMapping("/merge")
    public void mergeGuestCartIntoUserCart(@AuthenticationPrincipal CustomUserDetails userDetails, @CookieValue(value = "cart_token", required = false) String cartToken) {
        Long userId = userDetails.getUser().getId();
        cartService.mergeGuestCartIntoUser(userId, cartToken);
    }

    @GetMapping("/user/get")
    public CartDTO getUserCart(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return cartService.getUserCartDto(userDetails.getUser().getId());
    }

    @GetMapping("/guest/get")
    public CartDTO getGuestCart(@CookieValue("cart_token") String cartToken) {
        return cartService.getGuestCartDto(cartToken);
    }



}
