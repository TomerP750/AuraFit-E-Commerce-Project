package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductDTO;
import app.aurafitbackend.Enums.Rating;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Repositories.OrderItemRepository;
import app.aurafitbackend.Repositories.ProductRepository;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Utils.GeneralValidator;
import app.aurafitbackend.Utils.ProductValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final OrderItemRepository orderItemRepository;


    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new NotExistsException("Product not found"));
    }

    @Transactional
    public void createProduct(ProductCreateDTO dto) {
        if (!GeneralValidator.isValidProduct(dto)) {
            throw new RequestException("Missing information");
        }
        Product product = EntityDTOMapper.toEntity(dto);
        productRepository.save(product);

    }

    public void updateProduct(Product product) {
        if (ProductValidator.isValidProduct(product)) {
            productRepository.save(product);
        }
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public int getProductReviewsAverage(Long productId) {
        Product product = getProduct(productId);
        int sum = 0;

        for (Review review : product.getReviews()) {
            sum += extractReviewNumber(review.getRating());
        }

        return sum / product.getReviews().size();
    }

    private int extractReviewNumber(Rating rating) {

        switch (rating) {
            case ONE:
                return 1;
            case TWO:
                return 2;
            case THREE:
                return 3;
            case FOUR:
                return 4;
            case FIVE:
                return 5;
            default:
                return 0;

        }
    }


}
