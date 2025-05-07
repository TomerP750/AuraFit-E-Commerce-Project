package app.aurafitbackend.Utils;

import app.aurafitbackend.Repositories.FitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FitTypeValidator {

    private static FitTypeRepository fitTypeRepository;

    @Autowired
    public FitTypeValidator(FitTypeRepository fitTypeRepository) {
        FitTypeValidator.fitTypeRepository = fitTypeRepository;
    }
}
