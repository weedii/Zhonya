package com.madebywael.zhonya.exception_handler;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(EntityNotFoundException.class)
        public ResponseEntity<ExceptionResponse> handleException(EntityNotFoundException exp) {
                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.NOT_FOUND.value())
                                                                .error(exp.getMessage())
                                                                .build()

                                );
        }

        @ExceptionHandler(UsernameNotFoundException.class)
        public ResponseEntity<ExceptionResponse> handleException(UsernameNotFoundException exp) {
                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.NOT_FOUND.value())
                                                                .error(exp.getMessage())
                                                                .build()

                                );
        }

        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException exp) {
                return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.UNAUTHORIZED.value())
                                                                .error(exp.getMessage())
                                                                .build()

                                );
        }

        @ExceptionHandler(EntityExistsException.class)
        public ResponseEntity<ExceptionResponse> handleException(EntityExistsException exp) {
                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.BAD_REQUEST.value())
                                                                .error(exp.getMessage())
                                                                .build()

                                );
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException exp) {

                Set<String> errors = new HashSet<>();
                exp.getBindingResult().getAllErrors()
                                .forEach(err -> {
                                        var errMessage = err.getDefaultMessage();
                                        errors.add(errMessage);
                                });

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.BAD_REQUEST.value())
                                                                .validationErrors(errors)
                                                                .build()

                                );
        }

        @ExceptionHandler(AuthorizationDeniedException.class)
        public ResponseEntity<ExceptionResponse> handleException(AuthorizationDeniedException exp) {

                return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.UNAUTHORIZED.value())
                                                                .error(exp.getMessage())
                                                                .build()

                                );
        }

        @ExceptionHandler(InsufficientStockException.class)
        public ResponseEntity<ExceptionResponse> handleException(InsufficientStockException exp) {
                return ResponseEntity
                                .status(HttpStatus.CONFLICT)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.CONFLICT.value())
                                                                .error(exp.getMessage())
                                                                .build()

                                );
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
                return ResponseEntity
                                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(
                                                ExceptionResponse.builder()
                                                                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                                                .error(exp.getMessage())
                                                                .build()

                                );
        }

}
