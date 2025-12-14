package app.aurafitbackend.Security;

import app.aurafitbackend.user.User;
import app.aurafitbackend.auth.AuthDTOS.AuthResponse;
import app.aurafitbackend.Exceptions.JwtException;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.sql.Date;
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

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }


    public String generateToken(Long userId) {
        Date now = new Date(System.currentTimeMillis());
        Date expiry = new Date(now.getTime() + EXPIRATION_MS);
        User user = userRepository.findById(userId).orElseThrow(()->new NotExistsException("User not found"));
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("id", user.getId())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getSubjectFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            // various exceptions: ExpiredJwtException, MalformedJwtException, etc.
            return false;
        }
    }

    public void refreshToken(AuthResponse token) {

    }

}
