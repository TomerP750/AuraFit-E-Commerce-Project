package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);

    List<Product> findByCategoryAndSubCategory(Category category, SubCategory subCategory);
}
