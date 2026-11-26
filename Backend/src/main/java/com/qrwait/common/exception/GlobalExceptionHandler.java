package com.qrwait.common.exception;

import com.qrwait.common.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Bo bat loi tap trung cho toan bo REST Controllers (Detailed Design Muc 3.1).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiErrorResponse> handleBusiness(BusinessException ex) {
        ErrorCode code = ex.getErrorCode();
        return ResponseEntity
                .status(code.getHttpStatus())
                .body(ApiErrorResponse.of(code.name(), ex.getMessage(), ex.getDetails()));
    }

    @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
    public ResponseEntity<ApiErrorResponse> handleOptimisticLock(ObjectOptimisticLockingFailureException ex) {
        ErrorCode code = ErrorCode.ERR_CONCURRENT_CONFLICT;
        return ResponseEntity
                .status(code.getHttpStatus())
                .body(ApiErrorResponse.of(code.name(), code.getDefaultMessage(), Map.of()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, Object> fieldErrors = new HashMap<>();
        for (FieldError err : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(err.getField(), err.getDefaultMessage());
        }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiErrorResponse.of(ErrorCode.ERR_INVALID_INPUT.name(),
                        ErrorCode.ERR_INVALID_INPUT.getDefaultMessage(), fieldErrors));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        ErrorCode code = ErrorCode.ERR_FORBIDDEN;
        return ResponseEntity
                .status(code.getHttpStatus())
                .body(ApiErrorResponse.of(code.name(), code.getDefaultMessage(), Map.of()));
    }

    @ExceptionHandler(UnsupportedOperationException.class)
    public ResponseEntity<ApiErrorResponse> handleNotImplemented(UnsupportedOperationException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiErrorResponse.of("ERR_NOT_IMPLEMENTED", ex.getMessage(), Map.of()));
    }
}
