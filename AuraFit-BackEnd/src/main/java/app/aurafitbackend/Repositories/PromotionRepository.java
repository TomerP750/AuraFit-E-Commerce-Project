package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {


    @Query(value = "SELECT p FROM promotions p WHERE p.endDate < CURRENT_TIMESTAMP", nativeQuery = true)
    List<Promotion> findExpiredPromotions();

}
