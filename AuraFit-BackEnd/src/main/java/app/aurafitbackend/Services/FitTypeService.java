package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.FitType;
import app.aurafitbackend.Repositories.FitTypeRepository;
import app.aurafitbackend.Utils.FitTypeValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FitTypeService {

    private FitTypeRepository fitTypeRepository;

    public List<FitType> getAllFitTypes() {
        return fitTypeRepository.findAll();
    }

    public void addFitType(FitType fitType) {
        if (FitTypeValidator.isValidateFitType(fitType)) {
            fitTypeRepository.save(fitType);
        }
    }

    public void deleteFitType(Long fitTypeId) {
        fitTypeRepository.deleteById(fitTypeId);
    }

}
