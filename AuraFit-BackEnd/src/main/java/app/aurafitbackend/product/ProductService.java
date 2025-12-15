package app.aurafitbackend.product;

import app.aurafitbackend.review.Review;
import app.aurafitbackend.Enums.Gender;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.order.OrderItemRepository;
import app.aurafitbackend.productVariant.ProductVariantRepository;
import app.aurafitbackend.Utils.EntityDTOMapper;
import app.aurafitbackend.Utils.GeneralValidator;
import app.aurafitbackend.Utils.ProductValidator;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final OrderItemRepository orderItemRepository;


    public Page<ProductDTO> getAllProductsByGender(Gender gender, Pageable pageable) {

        Page<Product> products = productRepository.findByGender(gender ,pageable);
        return products.map(EntityDTOMapper::toProductDTO);

    }

    public Page<ProductDTO> filter(List<Long> sizeIds, List<Long> colorIds, Pageable pageable) {

        Specification<Product> spec =
                Specification.where(ProductSpecifications.hasVariantWithSizeIdsOrColorIds(sizeIds, colorIds));


        Page<Product> products = productRepository.findAll(spec, pageable);
        return products.map(EntityDTOMapper::toProductDTO);
    }

    public Page<Product> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
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
