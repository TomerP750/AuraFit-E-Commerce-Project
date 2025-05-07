package app.aurafitbackend.Services;

import app.aurafitbackend.Repositories.OrderItemRepository;
import app.aurafitbackend.Repositories.ProductRepository;
import app.aurafitbackend.Repositories.ProductVariantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final OrderItemRepository orderItemRepository;








}
