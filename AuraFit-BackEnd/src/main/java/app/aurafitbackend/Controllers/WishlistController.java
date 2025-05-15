package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.WishlistItem;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.WishlistItemService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@AllArgsConstructor
public class WishlistController {

    private final WishlistItemService wishlistItemService;

    @GetMapping("/all")
    public List<WishlistItem> allWishlistItems(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId();
        return wishlistItemService.getUserWishlistItems(userId);
    }

    @PostMapping("/addToWishlist/{id}")
    public void addToWishlist(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id) {
        Long userId = userDetails.getUser().getId();
        wishlistItemService.addProductToWishlist(userId, id);
    }

    @DeleteMapping("/deleteItem/{id}")
    public void deleteItem(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long id) {
        Long userId = userDetails.getUser().getId();
        wishlistItemService.removeProductFromWishlist(userId, id);
    }

}
