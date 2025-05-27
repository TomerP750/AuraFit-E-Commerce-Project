package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Size;
import app.aurafitbackend.DTOS.CreateDTOS.CreateSizeDTO;
import app.aurafitbackend.Repositories.SizeRepository;
import app.aurafitbackend.Utils.SizeValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class SizeService {

    private final SizeRepository sizeRepository;

    public List<Size> getAllSizes() {
        return sizeRepository.findAll();
    }

    public Size getOneSize(Long id) {
        return sizeRepository.findById(id).orElseThrow();
    }

    public List<Size> getSizesByProductType(Long productTypeId) {
        return sizeRepository.findByProductTypeId(productTypeId);
    }

    @Transactional
    public void addSize(CreateSizeDTO dto) {
        if (SizeValidator.isValidSize(dto)) {
            System.out.println(dto.getProductType());
            System.out.println("Size: " + dto.getSize());
            Size sizeToDb = Size.builder()
                    .size(dto.getSize())
                    .productType(List.of(dto.getProductType()))
                    .build();
            System.out.println("Size: " + sizeToDb);
            sizeRepository.save(sizeToDb);
        }
    }

    public void deleteSize(Long sizeId) {
        if (sizeRepository.existsById(sizeId)) {
            sizeRepository.deleteById(sizeId);
        }
    }



}
