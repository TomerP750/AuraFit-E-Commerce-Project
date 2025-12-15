package app.aurafitbackend.Utils;

import app.aurafitbackend.fitType.FitType;
import app.aurafitbackend.fitType.FitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FitTypeValidator {

    private static FitTypeRepository fitTypeRepository;

    @Autowired
    public FitTypeValidator(FitTypeRepository fitTypeRepository) {
        FitTypeValidator.fitTypeRepository = fitTypeRepository;
    }

    public static boolean isValidateFitType(FitType fitType) {
        return true;
    }

}
