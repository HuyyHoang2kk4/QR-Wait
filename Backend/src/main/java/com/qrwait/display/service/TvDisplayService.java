package com.qrwait.display.service;

import com.qrwait.display.dto.TvDisplayDtos.*;
import com.qrwait.iam.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Module M8: Quan ly ScreenToken (Secret URL Read-only) & du lieu TV Display (FR-034, FR-035, FR-036).
 */
@Service
public class TvDisplayService {

    /**
     * Sinh Secret Screen Token 64 ky tu cho TV Display va vo hieu hoa token cu neu tao lai (FR-034).
     */
    @Transactional
    public ScreenTokenDto generateScreenToken(UserPrincipal actor, UUID branchId) {
        // TODO: Vo hieu hoa token cu cua branchId -> sinh token moi TokenGenerator.nextHexToken(32)
        throw new UnsupportedOperationException("TODO: Implement TvDisplayService.generateScreenToken (FR-034)");
    }

    /**
     * Lay du lieu khoi tao TV Display tu screenToken (Read-only, khong can dang nhap) (FR-035).
     */
    @Transactional(readOnly = true)
    public TvDisplayBootstrapDto getBootstrap(String screenToken) {
        // TODO: Kiem tra screenToken active -> ERR_SCREEN_TOKEN_INVALID neu sai; tra ve servingCards, recentCalled, queuesQr, ttsEnabled
        throw new UnsupportedOperationException("TODO: Implement TvDisplayService.getBootstrap (FR-035)");
    }
}
