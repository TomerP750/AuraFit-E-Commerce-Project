package app.aurafitbackend.DTOS.AuthDTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegisterRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;

}
