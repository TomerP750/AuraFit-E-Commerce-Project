package app.aurafitbackend.color;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ColorRepository extends JpaRepository<Color, Long> {

    @Query("""
  select distinct c
  from ProductVariant v
  join v.color c
  where v.product.id = :productId
""")
    List<Color> findAvailableColorsForProductId(@Param("productId") Long productId);


}
