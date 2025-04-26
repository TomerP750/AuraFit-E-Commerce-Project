package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Product;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getOneProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(()->new NotExistsException("Product not found"));
    }



}
