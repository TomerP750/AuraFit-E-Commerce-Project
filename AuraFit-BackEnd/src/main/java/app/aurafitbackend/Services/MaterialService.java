package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Material;
import app.aurafitbackend.Repositories.MaterialRepository;
import app.aurafitbackend.Utils.MaterialValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MaterialService {

    private final MaterialRepository materialRepository;


    public void addMaterial(Material material) {
        if (MaterialValidator.isValidMaterial(material)) {
            materialRepository.save(material);
        }
    }

}
