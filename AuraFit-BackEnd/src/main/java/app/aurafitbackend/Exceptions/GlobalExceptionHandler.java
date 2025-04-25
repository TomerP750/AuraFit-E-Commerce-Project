package app.aurafitbackend.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(NotExistsException.class)
    public ResponseEntity<String> handleNotFoundException(NotExistsException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<String>handleInvalidInputException(InvalidInputException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
//
//    @ExceptionHandler(UnauthorizedException.class)
//    public ResponseEntity<String>handleUnauthorizedException(UnauthorizedException e){
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
//    }
//
//    @ExceptionHandler(MissingInformationException.class)
//    public ResponseEntity<String>handleUnauthorizedException(MissingInformationException e){
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//    }
//
//    @ExceptionHandler(JwtException.class)
//    public ResponseEntity<String>handleJwtException(JwtException e){
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
//    }
//
//    @ExceptionHandler(TimeExpiredException.class)
//    public ResponseEntity<String>handleTimeExpiredException(TimeExpiredException e) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//    }
//
//    @ExceptionHandler(RequestException.class)
//    public ResponseEntity<String>handleRequestException(RequestException e) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//    }

}
