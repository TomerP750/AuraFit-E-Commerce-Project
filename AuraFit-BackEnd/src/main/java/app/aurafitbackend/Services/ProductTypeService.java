package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.ProductType;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.ProductTypeRepository;
import app.aurafitbackend.Utils.ProductTypeValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductTypeService {

    private final ProductTypeRepository productTypeRepository;


    public List<ProductType> getAllProductTypes() {
        return productTypeRepository.findAll();
    }

    public ProductType getOneProductType(Long id) {
        return productTypeRepository.findById(id).orElseThrow(()->new NotExistsException("Sub Category Not Found"));
    }


    public void addProductType(ProductType productType) {
        if (ProductTypeValidator.isValidProductType(productType)) {
            productTypeRepository.save(productType);
        }
    }

    public void updateProductType(ProductType newProductType) {
        if (ProductTypeValidator.isValidProductType(newProductType)) {
            ProductType oldProductType = productTypeRepository.findById(newProductType.getId()).orElseThrow(()->new NotExistsException("Sub Category Not Found"));
            oldProductType.setName(newProductType.getName());
            productTypeRepository.save(oldProductType);
        }
    }

    public void deleteProductType(Long productTypeId) {
        ProductType productType = productTypeRepository.findById(productTypeId).orElseThrow(()->new NotExistsException("Sub Category Not Found"));
    }


}
