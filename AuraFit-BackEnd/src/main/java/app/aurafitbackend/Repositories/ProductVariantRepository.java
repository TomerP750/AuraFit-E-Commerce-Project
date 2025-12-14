package app.aurafitbackend.Repositories;

import app.aurafitbackend.color.Color;
import app.aurafitbackend.productVariant.ProductVariant;
import app.aurafitbackend.size.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {


    boolean existsByProductIdAndSizeAndColor(Long productId ,Size size, Color color);

    ProductVariant findByProductIdAndSizeAndColor(Long productId, Size size, Color color);

    List<ProductVariant> findByProductId(Long productId);


//    List<ProductVariant> findTop8ByCreatedAtDesc();

    @Query("""
        SELECT v
        FROM ProductVariant v
        JOIN v.product p
        LEFT JOIN v.color c
        WHERE lower(p.name) LIKE lower(concat('%', :q, '%'))
           OR lower(c.color) LIKE lower(concat('%', :q, '%'))
           OR lower(v.sku)  LIKE lower(concat('%', :q, '%'))
    """)
    Page<ProductVariant> search(@Param("q") String q, Pageable pageable);


    List<ProductVariant> findTop8ByOrderByCreatedAtDesc();

}
