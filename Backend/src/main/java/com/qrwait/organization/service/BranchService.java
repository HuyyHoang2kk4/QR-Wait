package com.qrwait.organization.service;

import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.organization.dto.OrgDtos.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Module M2: Quan ly Chi nhanh, Toa do/Ban kinh GPS (BRL-002) & Bat/Tat TTS TV Display (FR-006, FR-007, FR-036).
 */
@Service
public class BranchService {

    @Transactional(readOnly = true)
    public List<BranchDto> listBranches(UserPrincipal actor) {
        // TODO: OWNER xem tat ca chi nhanh thuoc org; MANAGER/STAFF chi xem chi nhanh duoc gan
        throw new UnsupportedOperationException("TODO: Implement BranchService.listBranches");
    }

    @Transactional
    public BranchDto createBranch(UUID orgId, UpsertBranchRequest req) {
        // TODO: Tao Branch moi voi gpsRadiusMeters=100, ttsEnabled=true (FR-006)
        throw new UnsupportedOperationException("TODO: Implement BranchService.createBranch (FR-006)");
    }

    @Transactional
    public BranchDto updateBranch(UserPrincipal actor, UUID branchId, UpsertBranchRequest req) {
        // TODO: Kiem tra quyen so huu chi nhanh va cap nhat thong tin + toa do GPS (FR-006)
        throw new UnsupportedOperationException("TODO: Implement BranchService.updateBranch (FR-006)");
    }

    /**
     * Cap nhat cau hinh chong gian lan vi tri GPS (30m - 500m) cho chi nhanh (FR-007, BRL-002).
     */
    @Transactional
    public BranchDto updateGeoConfig(UserPrincipal actor, UUID branchId, UpdateGeoConfigRequest req) {
        // TODO: Validate branch quyen + gpsRadiusMeters trong [30, 500] -> luu isGeoEnabled & gpsRadiusMeters
        throw new UnsupportedOperationException("TODO: Implement BranchService.updateGeoConfig (FR-007)");
    }

    /**
     * Bat / Tat giong doc Text-to-Speech (TTS) tren TV Display cua chi nhanh va dong bo realtime (FR-036).
     */
    @Transactional
    public boolean updateTtsConfig(UserPrincipal actor, UUID branchId, UpdateTtsConfigRequest req) {
        // TODO: Cap nhat branch.ttsEnabled va ban event TV_TTS_TOGGLED qua /topic/branch/{branchId}/tv sau commit
        throw new UnsupportedOperationException("TODO: Implement BranchService.updateTtsConfig (FR-036)");
    }
}
