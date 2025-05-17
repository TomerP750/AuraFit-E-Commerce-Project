package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.User;
import app.aurafitbackend.Beans.WishlistItem;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.UserRepository;
import app.aurafitbackend.Repositories.WishlistItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WishlistItemService {

    private WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductVariantRepository productVariantRepository;

    public List<WishlistItem> getUserWishlistItems(Long userId) {
        return wishlistItemRepository.findByUserId(userId);
    }

    public boolean WishlistUnWishlist(Long userId, Long variantId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotExistsException("User Not Found"));

        if (wishlistItemRepository.existsByUserIdAndProductVariantId(userId, variantId)) {
            WishlistItem existingWishlistItem = wishlistItemRepository.findByUserIdAndProductVariantId(userId, variantId).orElseThrow(() -> new NotExistsException("Wishlist Item Not Found"));
            if (existingWishlistItem != null) {
                wishlistItemRepository.deleteById(existingWishlistItem.getId());
                return false;
            }
        }
        ProductVariant productVariant = productVariantRepository.findById(variantId).orElseThrow(() -> new NotExistsException("Product Variant Not Found"));
        WishlistItem wishlistItem = WishlistItem.builder()
                .productVariant(productVariant)
                .user(user)
                .build();
        wishlistItemRepository.save(wishlistItem);
        return true;
    }

//    public void removeProductFromWishlist(Long userId, Long wishlistItemId) {
//
//    }

    public boolean isWishlisted(Long userId, Long productVariantId) {
        return wishlistItemRepository.existsByUserIdAndProductVariantId(userId, productVariantId);
    }


}
