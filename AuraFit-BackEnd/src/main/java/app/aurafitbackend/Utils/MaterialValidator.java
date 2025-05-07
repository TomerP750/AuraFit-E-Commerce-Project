package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Material;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.Repositories.MaterialRepository;
import org.springframework.stereotype.Component;

@Component
public class MaterialValidator {

    private static MaterialRepository materialRepository;

    public MaterialValidator(MaterialRepository materialRepository) {
        MaterialValidator.materialRepository = materialRepository;
    }

    public static boolean isValidMaterial(Material material) {
        if (material.getName().isEmpty()) {
            throw new InvalidInputException("Material name cannot be empty");
        }
        if (material.getMaterialPercent() <= 0 || material.getMaterialPercent() > 100) {
            throw new InvalidInputException("Material percent must be between 1 and 100");
        }
        return true;
    }
}
