package app.aurafitbackend.material;

import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Utils.MaterialValidator;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MaterialService {

    private final MaterialRepository materialRepository;


    public Page<Material> getAllMaterials(Pageable pageable) {
        return materialRepository.findAll(pageable);
    }

    public Material getOneMaterial(Long id) {
        return materialRepository.findById(id).orElseThrow(()-> new NotExistsException("Material not found"));
    }

    public void addMaterial(Material material) {
        if (MaterialValidator.isValidMaterial(material)) {
            materialRepository.save(material);
        }
    }
    public void deleteMaterial(Long materialId) {
        materialRepository.deleteById(materialId);
    }



}
