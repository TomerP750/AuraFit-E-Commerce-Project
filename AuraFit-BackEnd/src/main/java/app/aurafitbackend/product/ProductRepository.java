package app.aurafitbackend.product;

import app.aurafitbackend.category.Category;
import app.aurafitbackend.Enums.Gender;
import app.aurafitbackend.productType.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    List<Product> findByCategory(Category category);

    List<Product> findByCategoryAndProductType(Category category, ProductType productType);

    List<Product> findByGenderAndProductType(Gender gender, Category category);

    List<Product> findByGenderAndCategory(Gender gender, Category category);

    Page<Product> findByGender(Gender gender, Pageable pageable);
}
