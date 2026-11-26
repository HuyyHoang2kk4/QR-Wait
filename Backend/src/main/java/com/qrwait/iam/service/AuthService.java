package com.qrwait.iam.service;

import com.qrwait.iam.dto.AuthDtos.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Module M1: Dang ky, Dang nhap Email/Google SSO, Gia han & Thu hoi JWT (FR-001, FR-002).
 */
@Service
public class AuthService {

    /**
     * Dang ky tai khoan Organization Owner moi va khoi tao Organization dau tien (FR-001).
     *
     * <p>Thuat toan can trien khai:
     * 1. Kiem tra email chua ton tai trong UserRepository; neu trung -> nem ERR_DUPLICATE_RESOURCE.
     * 2. Kiem tra do manh mat khau (>= 8 ky tu, gom it nhat 1 chu cai & 1 chu so).
     * 3. Tao ban ghi Organization (timezone mac dinh Asia/Ho_Chi_Minh).
     * 4. Tao User voi role = UserRole.OWNER, passwordHash = passwordEncoder.encode(password).
     * 5. Sinh cap Access Token (JWT) + Refresh Token (luu SHA-256 hash vao bang refresh_tokens).
     * 6. Tra ve AuthResponse.
     */
    @Transactional
    public AuthResponse register(RegisterRequest req) {
        // TODO: Trien khai luong FR-001 theo Javadoc phia tren
        throw new UnsupportedOperationException("TODO: Implement AuthService.register (FR-001)");
    }

    /**
     * Dang nhap bang Email & Mat khau (FR-002).
     *
     * <p>Thuat toan can trien khai:
     * 1. Kiem tra Caffeine cache 'loginAttempts': neu so lan sai >= 5 -> nem ERR_TOO_MANY_LOGIN_ATTEMPTS.
     * 2. Tim User theo email; sai mat khau -> tang bien dem sai trong cache va nem ERR_INVALID_CREDENTIALS.
     * 3. Kiem tra user.isActive(); neu false -> nem ERR_ACCOUNT_DISABLED.
     * 4. Xoa bo dem sai mat khau, sinh Access Token + Refresh Token moi.
     */
    @Transactional
    public AuthResponse login(LoginRequest req) {
        // TODO: Trien khai luong FR-002 theo Javadoc phia tren
        throw new UnsupportedOperationException("TODO: Implement AuthService.login (FR-002)");
    }

    /**
     * Dang nhap hoac Tu dong dang ky bang Google Identity OAuth2 ID Token (FR-001, FR-002).
     */
    @Transactional
    public AuthResponse loginWithGoogle(GoogleLoginRequest req) {
        // TODO: Xac thuc idToken voi Google, tim hoac tao moi User/Organization
        throw new UnsupportedOperationException("TODO: Implement AuthService.loginWithGoogle");
    }

    /**
     * Gia han Access Token bang Refresh Token hop le (FR-002).
     */
    @Transactional
    public AuthResponse refresh(RefreshTokenRequest req) {
        // TODO: Tra cuu tokenHash trong refresh_tokens, kiem tra expiresAt & user.isActive()
        throw new UnsupportedOperationException("TODO: Implement AuthService.refresh");
    }

    /**
     * Dang xuat: xoa Refresh Token va dua userId vao jwtBlacklist neu can.
     */
    @Transactional
    public void logout(UUID userId, RefreshTokenRequest req) {
        // TODO: Xoa token khoi refresh_tokens
        throw new UnsupportedOperationException("TODO: Implement AuthService.logout");
    }
}
