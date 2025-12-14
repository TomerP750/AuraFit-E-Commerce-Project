package app.aurafitbackend.wishlist;

import app.aurafitbackend.product.Product;
import app.aurafitbackend.user.User;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.ProductRepository;
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
    private final ProductRepository productRepository;

    public List<WishlistItem> getUserWishlistItems(Long userId) {
        return wishlistItemRepository.findByUserId(userId);
    }

    public boolean WishlistUnWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotExistsException("User Not Found"));

        if (wishlistItemRepository.existsByUserIdAndProductId(userId, productId)) {
            WishlistItem existingWishlistItem = wishlistItemRepository.findByUserIdAndProductId(userId, productId).orElseThrow(()->new NotExistsException("Wishlist Item Not Found"));
            if (existingWishlistItem != null) {
                wishlistItemRepository.deleteById(existingWishlistItem.getId());
                return false;
            }
        }
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotExistsException("Product Variant Not Found"));
        WishlistItem wishlistItem = WishlistItem.builder()
                .product(product)
                .user(user)
                .build();
        wishlistItemRepository.save(wishlistItem);
        return true;
    }

    public void removeProductFromWishlist(Long userId, Long productId) {
        WishlistItem wishlistItem = wishlistItemRepository.findByUserIdAndProductId(userId, productId).orElseThrow(() -> new NotExistsException("Wishlist Item Not Found"));
        wishlistItemRepository.deleteById(wishlistItem.getId());
    }

    public boolean isWishlisted(Long userId, Long productId) {
        return wishlistItemRepository.existsByUserIdAndProductId(userId, productId);
    }


}
