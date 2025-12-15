package app.aurafitbackend.promotion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {


    @Query("SELECT p FROM Promotion p WHERE p.endTime < CURRENT_TIMESTAMP")
    List<Promotion> findExpiredPromotions();

}
