package com.qrwait.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Danh muc ma loi chuan hoa theo SRS Muc 13.2 & Detailed Design Muc 3.1.
 */
public enum ErrorCode {
    ERR_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "Vui long nhap ten khach hang de lay so."),
    ERR_PARTY_SIZE_INVALID(HttpStatus.BAD_REQUEST, "So luong nguoi trong nhom khong hop le cho hang cho nay."),
    ERR_RECALL_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "Da goi lai toi da 3 lan. Vui long danh dau Vang mat."),
    ERR_INVALID_INPUT(HttpStatus.BAD_REQUEST, "Du lieu dau vao khong hop le."),
    ERR_COUNTER_REQUIRED(HttpStatus.BAD_REQUEST, "Vui long chon Quay phuc vu truoc khi goi khach."),
    ERR_NO_WAITING_TICKETS(HttpStatus.BAD_REQUEST, "Hien khong co khach nao dang cho."),

    ERR_INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Email hoac mat khau khong chinh xac."),
    ERR_SCREEN_TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "Lien ket man hinh TV Display khong hop le hoac da bi thu hoi."),

    ERR_OUT_OF_GPS_RADIUS(HttpStatus.FORBIDDEN, "Ban dang o ngoai pham vi ban kinh GPS cho phep lay so."),
    ERR_GPS_PERMISSION_DENIED(HttpStatus.FORBIDDEN, "Cua hang yeu cau chia se vi tri de lay so. Vui long bat GPS."),
    ERR_ACCOUNT_DISABLED(HttpStatus.FORBIDDEN, "Tai khoan cua ban da bi vo hieu hoa. Vui long lien he quan tri vien."),
    ERR_FORBIDDEN(HttpStatus.FORBIDDEN, "Ban khong co quyen thuc hien thao tac nay."),

    ERR_RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "Khong tim thay du lieu yeu cau."),

    ERR_ACTIVE_TICKET_EXISTS(HttpStatus.CONFLICT, "Ban dang co luot ve dang cho phuc vu. Dang chuyen huong..."),
    ERR_CONCURRENT_CONFLICT(HttpStatus.CONFLICT, "Thao tac da duoc xu ly truoc do. Dang dong bo lai trang thai..."),
    ERR_TICKET_ALREADY_CALLED(HttpStatus.CONFLICT, "Ve nay da duoc goi boi mot quay khac."),
    ERR_DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "Du lieu da ton tai trong he thong."),
    ERR_INVALID_STATE_TRANSITION(HttpStatus.CONFLICT, "Khong the chuyen trang thai ve theo thao tac nay."),

    ERR_QR_CODE_REVOKED(HttpStatus.GONE, "Ma QR nay da duoc doi moi hoac het hieu luc. Vui long quet ma QR hien tai."),
    ERR_NOSHOW_RESTORE_EXPIRED(HttpStatus.GONE, "Ve da qua thoi gian an han 15 phut va da bi huy tu dong."),

    ERR_QUEUE_PAUSED_CLOSED(HttpStatus.LOCKED, "Hang cho hien dang tam dong nhan khach. Vui long lien he nhan vien."),

    ERR_RECALL_RATE_LIMITED(HttpStatus.TOO_MANY_REQUESTS, "Vui long doi it nhat 15 giay truoc khi thuc hien goi lai."),
    ERR_TOO_MANY_LOGIN_ATTEMPTS(HttpStatus.TOO_MANY_REQUESTS, "Nhap sai mat khau qua 5 lan. Vui long thu lai sau 5 phut.");

    private final HttpStatus httpStatus;
    private final String defaultMessage;

    ErrorCode(HttpStatus httpStatus, String defaultMessage) {
        this.httpStatus = httpStatus;
        this.defaultMessage = defaultMessage;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
