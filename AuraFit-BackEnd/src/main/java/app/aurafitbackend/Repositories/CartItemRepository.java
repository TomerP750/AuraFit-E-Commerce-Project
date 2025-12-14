package app.aurafitbackend.Repositories;

import app.aurafitbackend.cart.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByIdAndCartId(Long cartItemId, Long id);

    @Query(value = "SELECT * FROM cart_items WHERE cart_id = ?1", nativeQuery = true)
    List<CartItem> cartItemsFromCart(Long cartId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cart_items WHERE cart_id = ?1", nativeQuery = true)
    void deleteByCartId(Long cartId);

    void findByCartId(Long id);
}
