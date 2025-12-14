package app.aurafitbackend.Repositories;

import app.aurafitbackend.category.Category;
import app.aurafitbackend.product.Product;
import app.aurafitbackend.product.ProductType;
import app.aurafitbackend.Enums.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);

    List<Product> findByCategoryAndProductType(Category category, ProductType productType);

    List<Product> findByGenderAndProductType(Gender gender, Category category);

    List<Product> findByGenderAndCategory(Gender gender, Category category);

    List<Product> findByGender(Gender gender);
}
