package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Cart;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.AddToCartRequestDTO;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;


    @PostMapping("/addToCart")
    public Cart addToCart(@AuthenticationPrincipal CustomUserDetails userDetails,
                          @CookieValue(value = "cart_token", required = false) String cartToken,
                          @RequestBody AddToCartRequestDTO dto) {

        Long userId = userDetails.getUser().getId() != null ? userDetails.getUser().getId() : null;
        return cartService.addItemToCart(userId, cartToken, dto);
    }


}
