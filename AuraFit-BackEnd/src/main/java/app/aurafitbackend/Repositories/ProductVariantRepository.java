package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
}
