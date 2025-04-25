package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
