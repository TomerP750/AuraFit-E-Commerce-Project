package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Cart;
import app.aurafitbackend.Enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserIdAndStatus(Long userId, Status status);
}
