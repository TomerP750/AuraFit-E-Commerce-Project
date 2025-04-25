package app.aurafitbackend.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(1)
public class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Allow cross-origin requests from all origins
        response.setHeader("Access-Control-Allow-Origin", "*");
        // Allow specific methods
        response.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
        // Allow specific headers
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

        // Handle pre-flight OPTIONS request
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
        } else {
            // Continue the request chain
            filterChain.doFilter(request, response);
        }
    }


}
