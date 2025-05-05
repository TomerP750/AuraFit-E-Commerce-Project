package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
