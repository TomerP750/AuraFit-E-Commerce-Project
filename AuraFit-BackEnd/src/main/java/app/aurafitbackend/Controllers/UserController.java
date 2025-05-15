package app.aurafitbackend.Controllers;

import app.aurafitbackend.DTOS.DisplayDTOS.UserDTO;
import app.aurafitbackend.DTOS.UpdateUserDTO;
import app.aurafitbackend.Security.CustomUserDetails;
import app.aurafitbackend.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public UserDTO getProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId();
        return userService.getAccountDetails(userId);
    }

    @DeleteMapping("/delete/{password}")
    public void deleteAccount(@AuthenticationPrincipal CustomUserDetails userDetails,@PathVariable String password) {
        Long userId = userDetails.getUser().getId();
        userService.deleteUser(userId, password);
    }

    @PutMapping("/update")
    public void UpdateAccount(@AuthenticationPrincipal CustomUserDetails userDetails,@RequestBody UpdateUserDTO updateUserDto) {
//        Long userId = userDetails.getUser().getId();
        userService.updateUserDetails(updateUserDto);
    }

}
