package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.ContactInformation;
import app.aurafitbackend.Beans.Order;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.ContactInformationDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.OrderResponseDTO;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.OrderService;
import app.aurafitbackend.Utils.EntityDTOMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/user/placeOrder")
    public OrderResponseDTO checkoutUser(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody ContactInformation contactInformation) {
        Long userId = userDetails.getUser().getId();
        return EntityDTOMapper.toOrderResponseDTO(orderService.placeOrderForUser(userId, contactInformation));
    }

    // guest: read cart_token cookie
    @PostMapping("/guest")
    public Order checkoutGuest(@CookieValue("cart_token") String cartToken, @RequestBody ContactInformation contactInformation) {
        return orderService.placeOrderForGuest(cartToken, contactInformation);
    }

    @GetMapping("/user/history")
    List<OrderResponseDTO> getUserHistory(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId();
        return orderService.getUserOrderHistory(userId);
    }
}

