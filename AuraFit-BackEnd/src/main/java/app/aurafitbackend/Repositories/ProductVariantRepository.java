package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Color;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {


    boolean existsByProductIdAndSizeAndColor(Long productId ,Size size, Color color);

    ProductVariant findByProductIdAndSizeAndColor(Long productId, Size size, Color color);


//    List<ProductVariant> findTop8ByCreatedAtDesc();

}
