package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Cart;
import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.SubCategory;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.ProductRepository;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Repositories.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DisplayService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

   

    public Product getOneProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(()->new NotExistsException("Product not found"));
    }




}
