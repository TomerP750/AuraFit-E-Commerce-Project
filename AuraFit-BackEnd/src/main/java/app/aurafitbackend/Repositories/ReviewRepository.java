package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
