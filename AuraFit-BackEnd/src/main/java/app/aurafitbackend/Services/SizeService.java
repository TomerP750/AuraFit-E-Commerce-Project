package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Size;
import app.aurafitbackend.Repositories.SizeRepository;
import app.aurafitbackend.Utils.SizeValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SizeService {

    private final SizeRepository sizeRepository;

    public List<Size> getAllSizes() {
        return sizeRepository.findAll();
    }


    public void addSize(Size size) {
        if (SizeValidator.isValidSize(size)) {
            sizeRepository.save(size);
        }
    }

    public void deleteSize(Long sizeId) {
        if (sizeRepository.existsById(sizeId)) {
            sizeRepository.deleteById(sizeId);
        }
    }



}
