package app.aurafitbackend.Utils;

import app.aurafitbackend.color.Color;
import app.aurafitbackend.Exceptions.InvalidInputException;
import app.aurafitbackend.color.ColorRepository;
import org.springframework.stereotype.Component;

@Component
public class ColorValidator {

    private static ColorRepository colorRepository;

    public ColorValidator(ColorRepository colorRepository) {
        ColorValidator.colorRepository = colorRepository;
    }


    public static boolean isValidColor(Color color) {
        if (color.getColor().isEmpty()) {
            throw new InvalidInputException("Color is empty");
        }
        return true;
    }
}
