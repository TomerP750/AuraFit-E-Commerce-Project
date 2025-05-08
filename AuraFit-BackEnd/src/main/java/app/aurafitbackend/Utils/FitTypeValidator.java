package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.FitType;
import app.aurafitbackend.Repositories.FitTypeRepository;
import app.aurafitbackend.Services.FitTypeService;
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
