package com.qrwait.common.dto;

import java.time.Instant;

/**
 * Wrapper JSON chuan cho tat ca REST API thanh cong.
 */
public record ApiResponse<T>(
        boolean success,
        T data,
        Instant timestamp
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, data, Instant.now());
    }
}
