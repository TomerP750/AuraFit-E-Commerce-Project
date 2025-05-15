package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    List<WishlistItem> findByUserId(Long id);

    boolean existsByUserIdAndProductVariantId(Long userId, Long productVariantId);
}
