package app.aurafitbackend.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(2)
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            // 1) Extract token from "Authorization" header
            String jwt = parseJwt(request);

            // 2) If it exists and is valid
            if (jwt != null && jwtUtil.validateToken(jwt)) {

                // 3) Get the userId as a string from the subject
                String subject = jwtUtil.getSubjectFromToken(jwt);
                System.out.println("subject: " + subject);
                // Convert to Long
                Long userId = Long.valueOf(subject);
                System.out.println("userId: " + userId);
                // 4) Load user details from DB by ID
                CustomUserDetails userDetails =
                        (CustomUserDetails) customUserDetailsService.loadUserById(userId);
                System.out.println("userDetails: " + userDetails);
                // 5) Create authentication token
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 6) Set auth in context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception e) {
            System.out.println("Cannot set user authentication: " + e.getMessage());
        }

        // Continue filter chain

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().startsWith("/api/auth") || request.getServletPath().startsWith("/api/display") || request.getServletPath().startsWith("/api/cart/guest") || request.getServletPath().startsWith("/api/order/guest");
    }
}
