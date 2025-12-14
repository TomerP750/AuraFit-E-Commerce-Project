package app.aurafitbackend.product;

import app.aurafitbackend.review.Review;
import app.aurafitbackend.Enums.Gender;
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

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final OrderItemRepository orderItemRepository;


    public List<ProductDTO> getAllProductsByGender(Gender gender) {
        List<ProductDTO> dtos = new ArrayList<>();
        List<Product> products = productRepository.findByGender(gender);
        products.forEach(product -> {
            dtos.add(EntityDTOMapper.toProductDTO(product));
        });

        return dtos;
    }

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

    public void updateProduct(UpdateProductDTO updateProduct) {
        if (ProductValidator.isValidProduct(updateProduct)) {
            Product product = productRepository.findById(updateProduct.getId()).orElseThrow(() -> new NotExistsException("Product not found"));
            product.setName(updateProduct.getName());
            product.setDescription(updateProduct.getDescription());
            product.setProductType(updateProduct.getProductType());
//            product.setOnSale(product.getOnSale());
            product.setCategory(product.getCategory());
            productRepository.save(product);
        }
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public int getProductReviewsAverage(Long productId) {
        Product product = getProduct(productId);
        if (product.getReviews().isEmpty()) {
            return 0;
        }

        int sum = 0;

        for (Review review : product.getReviews()) {
            sum += review.getRating();
        }

        return sum / product.getReviews().size();
    }



}
