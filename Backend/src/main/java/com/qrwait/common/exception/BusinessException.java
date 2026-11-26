package com.qrwait.common.exception;

import java.util.Collections;
import java.util.Map;

/**
 * Exception nghiep vu dung chung toan he thong, tu dong map thanh HTTP status & errorCode.
 */
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;
    private final Map<String, Object> details;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getDefaultMessage());
        this.errorCode = errorCode;
        this.details = Collections.emptyMap();
    }

    public BusinessException(ErrorCode errorCode, String customMessage) {
        super(customMessage);
        this.errorCode = errorCode;
        this.details = Collections.emptyMap();
    }

    public BusinessException(ErrorCode errorCode, String customMessage, Map<String, Object> details) {
        super(customMessage);
        this.errorCode = errorCode;
        this.details = details == null ? Collections.emptyMap() : details;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public Map<String, Object> getDetails() {
        return details;
    }
}
