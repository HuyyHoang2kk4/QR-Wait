package com.qrwait.organization.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.organization.dto.OrgDtos.*;
import com.qrwait.organization.service.BranchService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/branches")
public class BranchController {

    private final BranchService branchService;

    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @GetMapping
    public ApiResponse<List<BranchDto>> listBranches(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(branchService.listBranches(principal));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('OWNER')")
    public ApiResponse<BranchDto> createBranch(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpsertBranchRequest req) {
        return ApiResponse.ok(branchService.createBranch(principal.organizationId(), req));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<BranchDto> updateBranch(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody UpsertBranchRequest req) {
        return ApiResponse.ok(branchService.updateBranch(principal, id, req));
    }

    @PatchMapping("/{id}/geo")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<BranchDto> updateGeo(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateGeoConfigRequest req) {
        return ApiResponse.ok(branchService.updateGeoConfig(principal, id, req));
    }

    @PatchMapping("/{id}/tts")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER', 'STAFF')")
    public ApiResponse<Map<String, Boolean>> updateTts(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTtsConfigRequest req) {
        boolean enabled = branchService.updateTtsConfig(principal, id, req);
        return ApiResponse.ok(Map.of("ttsEnabled", enabled));
    }
}
