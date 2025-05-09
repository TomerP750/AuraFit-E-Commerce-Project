package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductDTO;
import app.aurafitbackend.Exceptions.NotExistsException;
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
        return productRepository.findById(id).orElseThrow(()->new NotExistsException("Product not found"));
    }

    @Transactional
    public void createProduct(ProductCreateDTO newProductDTO) {
        if (GeneralValidator.isValidProduct(newProductDTO)) {

            Product product = EntityDTOMapper.toEntity(newProductDTO);
            productRepository.save(product);
        }
    }

    public void updateProduct(Product product) {
        if (ProductValidator.isValidProduct(product)) {
            productRepository.save(product);
        }
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }







}
