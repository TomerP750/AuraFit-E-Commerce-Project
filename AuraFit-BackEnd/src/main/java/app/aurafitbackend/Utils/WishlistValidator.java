package app.aurafitbackend.Utils;

import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.wishlist.WishlistItemRepository;
import org.springframework.stereotype.Component;

@Component
public class WishlistValidator {

    private static WishlistItemRepository wishlistItemRepository;
    private WishlistValidator(WishlistItemRepository wishlistItemRepository) {
        WishlistValidator.wishlistItemRepository = wishlistItemRepository;
    }


    public static boolean isValidAddToWishlistRequest(Long userId, Long wishlistId) {
        if (wishlistItemRepository.existsByUserIdAndProductId(userId, wishlistId)) {
            throw new RequestException("Already in wishlist");
        }
        return true;
    }
}
