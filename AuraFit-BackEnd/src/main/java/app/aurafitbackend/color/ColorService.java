package app.aurafitbackend.color;

import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Utils.ColorValidator;
import app.aurafitbackend.productVariant.ProductVariantRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorService {

    private final ColorRepository colorRepository;
    private final ProductVariantRepository productVariantRepository;

    public List<Color> getAllColors() {
        return colorRepository.findAll();
    }

    public List<Color> allProductAvailableSizes(Long productId) {
        return colorRepository.findAvailableColorsForProductId(productId);
    }

    public Color getOneColor(Long id) {
        return colorRepository.findById(id).orElseThrow(() -> new NotExistsException("Color not found"));
    }

    public void createColor(Color color) {
        if (ColorValidator.isValidColor(color)) {
            colorRepository.save(color);
        }
    }

    public void deleteColor(Long id) {
        colorRepository.deleteById(id);
    }

}
