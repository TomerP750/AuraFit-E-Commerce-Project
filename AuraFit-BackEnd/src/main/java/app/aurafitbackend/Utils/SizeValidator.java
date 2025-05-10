package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Size;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.Repositories.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SizeValidator {

    private static SizeRepository sizeRepository;

    @Autowired
    private SizeValidator(SizeRepository sizeRepository) {
        SizeValidator.sizeRepository = sizeRepository;
    }

    public static boolean isValidSize(Size size) {
        if (size.getSize().isEmpty()) {
            throw new InvalidInputException("Size cannot be empty");
        }
        if (size.getProductType() == null) {
            throw new InvalidInputException("SubCategory cannot be empty");
        }
        return true;
    }
}
