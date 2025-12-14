package app.aurafitbackend.auth.AuthDTOS;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

@AllArgsConstructor
@Data
public class AuthResponse {
    @Setter(AccessLevel.NONE)
    private String token;
}
