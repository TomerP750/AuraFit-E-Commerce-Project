package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.DTOS.AuthDTOS.RegisterRequest;
import app.aurafitbackend.DTOS.CreateDTOS.ProductCreateDTO;
import app.aurafitbackend.Exceptions.InvalidInputException;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class ValidatorService {


    private ValidatorService() {

    }

    public static boolean validateFirstName(String firstName) {
        if (firstName.isEmpty() || !firstName.matches("^[A-Za-z]+$")) {
            throw new InvalidInputException("Invalid First Name");
        }
        if (firstName.length() >= 10) {
            throw new InvalidInputException("First Name too long");
        }

        return true;
    }

    public static boolean validateLastName(String lastName) {

        if (lastName.isEmpty() || !lastName.matches("^[A-Za-z]+$")) {
            throw new InvalidInputException("Invalid Last Name");
        }
        if (lastName.length() >= 10) {
            throw new InvalidInputException("Last Name too long");
        }

        return true;
    }

    public static boolean validateEmail(String email) {
        Pattern EMAIL_PATTERN = Pattern.compile(
                "^[a-zA-Z0-9._%+-]+@(?i)(gmail\\.com|yahoo\\.com|outlook\\.com|icloud\\.com|protonmail\\.com|hotmail\\.com|live\\.com|mail\\.com|test\\.com)$"
        );

        return EMAIL_PATTERN.matcher(email).matches();
    }

    public static boolean validatePassword(String password) {
        if (password.length() < 6) {
            throw new InvalidInputException("Password Too Short, Please enter at least 6 characters");
        }

        return true;
    }

    public static boolean successfulUserRegister(RegisterRequest registerRequest) {

        return ValidatorService.validateEmail(registerRequest.getEmail())
                && ValidatorService.validateFirstName(registerRequest.getFirstName())
                && ValidatorService.validateLastName(registerRequest.getLastName())
                && ValidatorService.validatePassword(registerRequest.getPassword());
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
