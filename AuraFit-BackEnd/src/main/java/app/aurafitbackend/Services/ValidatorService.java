package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.DTOS.AuthDTOS.RegisterRequest;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import org.springframework.stereotype.Service;

@Service
public class ValidatorService {


    private ValidatorService() {

    }

    public static boolean validateFirstName(String firstName) {
        return false;
    }

    public static boolean validateLastName(String lastName) {
        return false;
    }

    public static boolean validateEmail(String email) {
        return false;
    }

    public static boolean validatePassword(String password) {
        return false;
    }

    public static boolean successfulUserRegister(RegisterRequest registerRequest) {
        if (!ValidatorService.validateEmail(registerRequest.getPassword())) {
            return false;
        }

        if (!ValidatorService.validateFirstName(registerRequest.getFirstName())) {
            return false;
        }

        if (!ValidatorService.validateLastName(registerRequest.getLastName())) {
            return false;
        }

        if (!ValidatorService.validatePassword(registerRequest.getPassword())) {
            return false;
        }

        return true;
    }




    public static boolean isValidReview(Review review) {
        return false;
    }


    public static boolean isValidProduct(ProductCreateDTO product) {
        return false;
    }

    public static boolean isValidProductVariant(ProductVariant productVariant) {
        return false;
    }

}
