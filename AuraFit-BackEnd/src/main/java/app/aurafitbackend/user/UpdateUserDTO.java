package app.aurafitbackend.user;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateUserDTO {

    @Setter(AccessLevel.NONE)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

}
