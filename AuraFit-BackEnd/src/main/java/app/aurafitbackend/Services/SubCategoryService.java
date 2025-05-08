package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.SubCategory;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.SubCategoryRepository;
import app.aurafitbackend.Utils.CategoryValidator;
import app.aurafitbackend.Utils.SubCategoryValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;


    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }


    public void addSubCategory(SubCategory subCategory) {
        if (SubCategoryValidator.isValidSubCategory(subCategory)) {
            subCategoryRepository.save(subCategory);
        }
    }

    public void updateSubCategory(SubCategory newSubCategory) {
        if (SubCategoryValidator.isValidSubCategory(newSubCategory)) {
            SubCategory oldSubCategory = subCategoryRepository.findById(newSubCategory.getId()).orElseThrow(()->new NotExistsException("Sub Category Not Found"));
            oldSubCategory.setName(newSubCategory.getName());
            subCategoryRepository.save(oldSubCategory);
        }
    }

    public void deleteSubCategory(Long subCategoryId) {
        SubCategory subCategory = subCategoryRepository.findById(subCategoryId).orElseThrow(()->new NotExistsException("Sub Category Not Found"));
    }


}
