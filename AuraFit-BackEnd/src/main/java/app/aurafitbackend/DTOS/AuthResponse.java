package app.aurafitbackend.DTOS;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

@AllArgsConstructor
public class AuthResponse {
    @Setter(AccessLevel.NONE)
    private String token;
}
