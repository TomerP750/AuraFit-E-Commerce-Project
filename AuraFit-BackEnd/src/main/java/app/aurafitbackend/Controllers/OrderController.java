package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.ContactInformation;
import app.aurafitbackend.Beans.Order;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.ContactInformationDTO;
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

    @PostMapping("/user/placeOrder")
    public void checkoutUser(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody ContactInformation contactInformation) {
        Long userId = userDetails.getUser().getId();
        orderService.placeOrderForUser(userId, contactInformation);
    }

    // guest: read cart_token cookie
    @PostMapping("/guest")
    public Order checkoutGuest(@CookieValue("cart_token") String cartToken, @RequestBody ContactInformation contactInformation) {
        return orderService.placeOrderForGuest(cartToken, contactInformation);
    }
}

