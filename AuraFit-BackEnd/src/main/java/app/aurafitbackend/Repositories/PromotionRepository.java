package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
}
