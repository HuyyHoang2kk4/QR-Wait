package com.qrwait.iam.service;

import com.qrwait.iam.dto.AuthDtos.*;
import com.qrwait.iam.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Module M1: Quan ly tai khoan Nhan vien / Quan ly truc tiep khong qua email kich hoat (FR-003, FR-004).
 */
@Service
public class UserService {

    /**
     * Lay danh sach nhan su thuoc to chuc (co loc theo branchId neu Manager truy cap).
     */
    @Transactional(readOnly = true)
    public List<UserSummaryDto> listUsers(UserPrincipal actor, UUID branchId) {
        // TODO: OWNER xem toan Org; MANAGER chi xem user thuoc chi nhanh minh quan ly
        throw new UnsupportedOperationException("TODO: Implement UserService.listUsers (FR-003)");
    }

    /**
     * Tao truc tiep tai khoan MANAGER hoac STAFF (FR-003).
     *
     * <p>Thuat toan can trien khai:
     * 1. Chi cho phep tao role MANAGER hoac STAFF (khong tao OWNER/SUPER_ADMIN).
     * 2. Neu actor la MANAGER: kiem tra tat ca req.branchIds phai nam trong actor.branchIds(); neu vuot -> ERR_FORBIDDEN.
     * 3. Kiem tra email duy nhat -> ERR_DUPLICATE_RESOURCE.
     * 4. Bam mat khau BCrypt, gan branches, luu User voi isActive = true.
     */
    @Transactional
    public UserSummaryDto createStaffAccount(UserPrincipal actor, CreateUserRequest req) {
        // TODO: Trien khai luong FR-003
        throw new UnsupportedOperationException("TODO: Implement UserService.createStaffAccount (FR-003)");
    }

    /**
     * Khoa / Mo khoa tai khoan nhan vien & Thu hoi phien tuc thi (FR-004).
     *
     * <p>Thuat toan can trien khai:
     * 1. Cap nhat user.setActive(req.isActive()).
     * 2. Neu isActive == false:
     *    - Xoa toan bo refresh_tokens cua userId trong DB.
     *    - Put timestamp System.currentTimeMillis() vao Caffeine cache 'jwtBlacklist' theo key userId.
     *    - Sau commit (AFTER_COMMIT), gui event STAFF_USER_REVOKED qua WebSocket /topic/staff/{branchId}.
     */
    @Transactional
    public UserSummaryDto updateUserStatus(UserPrincipal actor, UUID targetUserId, UpdateUserStatusRequest req) {
        // TODO: Trien khai luong FR-004
        throw new UnsupportedOperationException("TODO: Implement UserService.updateUserStatus (FR-004)");
    }
}
