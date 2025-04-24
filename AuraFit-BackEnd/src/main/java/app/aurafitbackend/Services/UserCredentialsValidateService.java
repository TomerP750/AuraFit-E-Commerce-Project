package app.aurafitbackend.Services;

import app.aurafitbackend.DTOS.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialsValidateService {


    private UserCredentialsValidateService() {

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

    public static boolean checkSuccessRegister(RegisterRequest registerRequest) {
        if (!UserCredentialsValidateService.validateEmail(registerRequest.getPassword())) {
            return false;
        }

        if (!UserCredentialsValidateService.validateFirstName(registerRequest.getFirstName())) {
            return false;
        }

        if (!UserCredentialsValidateService.validateLastName(registerRequest.getLastName())) {
            return false;
        }

        if (!UserCredentialsValidateService.validatePassword(registerRequest.getPassword())) {
            return false;
        }

        return true;
    }

}
