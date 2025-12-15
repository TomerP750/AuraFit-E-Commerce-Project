package app.aurafitbackend.wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    List<WishlistItem> findByUserId(Long id);

//    boolean existsByUserIdAndProductVariantId(Long userId, Long productVariantId);

//    Optional<WishlistItem> findByUserIdAndProductVariantId(Long userId ,Long variantId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);

    Optional<WishlistItem> findByUserIdAndProductId(Long userId, Long productId);
}
