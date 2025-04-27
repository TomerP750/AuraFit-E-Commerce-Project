package app.aurafitbackend.DTOS.AuthDTOS;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
public class AuthResponse {
    @Setter(AccessLevel.NONE)
    private String token;
}
