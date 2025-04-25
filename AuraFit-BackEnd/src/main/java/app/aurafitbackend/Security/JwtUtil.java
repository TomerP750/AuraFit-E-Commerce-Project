package app.aurafitbackend.Security;

import app.aurafitbackend.Beans.User;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Set;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET;

    @Value("${jwt.expirationMs}")
    private long EXPIRATION_MS;

    private final UserRepository userRepository;

    @Getter
    public Set<String> activeTokens;

    public JwtUtil(UserRepository userRepository, Set<String> activeTokens) {
        this.userRepository = userRepository;
        this.activeTokens = activeTokens;
    }

    private Key getSignInKey() {
        return null;
    }

    public String generateToken(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new NotExistsException("User not found"));
        return null;
    }


}
