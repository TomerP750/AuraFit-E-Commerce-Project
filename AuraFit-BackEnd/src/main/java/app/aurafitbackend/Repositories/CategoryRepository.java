package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
