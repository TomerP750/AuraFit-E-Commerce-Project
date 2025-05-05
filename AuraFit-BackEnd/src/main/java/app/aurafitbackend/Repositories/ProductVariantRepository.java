package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {


    List<ProductVariant> findTop8ByCreatedAtDesc();

}
