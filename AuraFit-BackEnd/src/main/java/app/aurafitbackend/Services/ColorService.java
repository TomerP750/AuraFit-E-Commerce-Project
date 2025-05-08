package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Color;
import app.aurafitbackend.Repositories.ColorRepository;
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

}
