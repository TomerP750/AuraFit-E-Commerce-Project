package app.aurafitbackend.size;

import app.aurafitbackend.Repositories.SizeRepository;
import app.aurafitbackend.Utils.SizeValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    public List<SizeDTO> getSizesByProductTypeTest(Long productTypeId) {
        List<Size> sizes = sizeRepository.findByProductTypeId(productTypeId);
        List<SizeDTO> dtos = new ArrayList<>();
        for (Size size : sizes) {
            dtos.add(SizeDTO.builder()
                    .id(size.getId())
                    .productType(size.getProductType().get(0))
                    .size(size.getSize())
                    .build());
        }
        return dtos;
    }

    @Transactional
    public void addSize(CreateSizeDTO dto) {
        if (SizeValidator.isValidSize(dto)) {
            Size sizeToDb = Size.builder()
                    .size(dto.getSize())
                    .productType(List.of(dto.getProductType()))
                    .build();
            sizeRepository.save(sizeToDb);
        }
    }

    public void deleteSize(Long sizeId) {
        if (sizeRepository.existsById(sizeId)) {
            sizeRepository.deleteById(sizeId);
        }
    }


}
