package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.User;
import app.aurafitbackend.Beans.WishlistItem;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.UnauthorizedException;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.UserRepository;
import app.aurafitbackend.Repositories.WishlistItemRepository;
import app.aurafitbackend.Utils.WishlistValidator;
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

    public void addProductToWishlist(Long userId, Long variantId) {
        if (WishlistValidator.isValidAddToWishlistRequest()) {
            User user = userRepository.findById(userId).orElseThrow(() -> new NotExistsException("User Not Found"));
            ProductVariant productVariant = productVariantRepository.findById(variantId).orElseThrow(() -> new NotExistsException("Product Variant Not Found"));

            WishlistItem wishlistItem = WishlistItem.builder()
                    .productVariant(productVariant)
                    .user(user)
                    .build();
            wishlistItemRepository.save(wishlistItem);
        }
    }

    public void removeProductFromWishlist(Long userId, Long wishlistItemId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotExistsException("User Not Found"));
        WishlistItem wishlistItem = wishlistItemRepository.findById(wishlistItemId).orElseThrow(() -> new NotExistsException("Wishlist Item Not Found"));
        if (wishlistItem.getUser().getId() != user.getId()) {
            throw new UnauthorizedException("You do not have permission to delete this product");
        }
        wishlistItemRepository.deleteById(wishlistItem.getId());
    }

    public boolean isWishlisted(Long userId, Long productVariantId) {
        return wishlistItemRepository.existsByUserIdAndProductVariantId(userId, productVariantId);
    }




}
