package app.aurafitbackend.color;

import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Utils.ColorValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ColorService {

    private ColorRepository colorRepository;


    public List<Color> getAllColors() {
        return colorRepository.findAll();
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
