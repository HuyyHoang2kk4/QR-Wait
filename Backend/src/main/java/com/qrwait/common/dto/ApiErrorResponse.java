package com.qrwait.common.dto;

import java.time.Instant;
import java.util.Map;

/**
 * Wrapper JSON chuan cho moi phan hoi loi tu GlobalExceptionHandler.
 */
public record ApiErrorResponse(
        boolean success,
        String errorCode,
        String message,
        Map<String, Object> details,
        Instant timestamp
) {
    public static ApiErrorResponse of(String errorCode, String message, Map<String, Object> details) {
        return new ApiErrorResponse(false, errorCode, message, details, Instant.now());
    }
}
