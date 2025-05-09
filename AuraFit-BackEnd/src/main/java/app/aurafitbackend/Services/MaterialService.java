package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Material;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.MaterialRepository;
import app.aurafitbackend.Utils.MaterialValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MaterialService {

    private final MaterialRepository materialRepository;


    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
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
