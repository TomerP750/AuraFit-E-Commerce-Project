package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Order;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.CheckoutRequestDTO;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/user")
    public Order checkoutUser(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CheckoutRequestDTO dto) {
        Long userId = userDetails.getUser().getId();
        Order order = orderService.placeOrder(userId, dto, /*cartToken=*/null);
        return order;
    }

    // guest: read cart_token cookie
    @PostMapping("/guest")
    public Order checkoutGuest(@CookieValue("cart_token") String cartToken, @RequestBody CheckoutRequestDTO dto) {
        Order order = orderService.placeOrder(/*userId=*/null, dto, cartToken);
        return order;
    }
}

