package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    private void register(RegisterRequest registerRequest) {

        if (UserCredentialsValidateService.checkSuccessRegister(registerRequest)) {
            User user = User.builder()
                    .email(registerRequest.getEmail())
                    .firstName(registerRequest.getFirstName())
                    .lastName(registerRequest.getLastName())



                    .build();
        }
    }
}
