package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
}
