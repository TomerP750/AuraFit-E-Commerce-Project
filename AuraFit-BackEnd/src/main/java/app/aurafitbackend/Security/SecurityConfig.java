package app.aurafitbackend.Security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // We disable CSRF for JWT-based API
        // We also allow public access to "/auth/**" so we can do login
        // Then we require authentication for other endpoints
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                        .requestMatchers("/api/cart/guest/**").permitAll()
                        .requestMatchers("/api/auth/**", "/api/display/**", "/api/cart/guest/**", "/api/order/guest/**").permitAll()
                        .anyRequest().authenticated()
                )
                // We make Spring Security stateless for JWT usage
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }

    // Configure the authentication provider with userDetailsService + password encoder
    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        // 1) Allow only your React app’s origin (NOT "*")
        cfg.setAllowedOrigins(List.of("http://localhost:5173"));
        // 2) Allow sending cookies/credentials
        cfg.setAllowCredentials(true);
        // 3) Which HTTP methods are OK
        cfg.addAllowedMethod("*");   // GET, POST, OPTIONS, …

//        cfg.setAllowedMethods(List.of("OPTIONS", "POST", "GET", "PUT", "DELETE"));
        // 4) Which headers your frontend might send
        cfg.addAllowedHeader("*");   // Content-Type, Cookie, …

//        cfg.setAllowedHeaders(List.of(
//                "Authorization",
//                "Origin",
//                "Accept",
//                "Content-Type",
//                "Access-Control-Request-Method",
//                "Access-Control-Request-Headers"
//        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }

}
