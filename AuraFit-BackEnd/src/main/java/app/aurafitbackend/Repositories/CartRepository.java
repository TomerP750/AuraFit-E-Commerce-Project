package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Cart;
import app.aurafitbackend.Enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserIdAndStatus(Long userId, Status status);

    boolean existsByUserIdAndStatus(Long userId, Status status);

    Optional<Cart> findByCartTokenAndStatus(String cartToken, Status status);
}
