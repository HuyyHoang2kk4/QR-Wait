package com.qrwait.organization.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.organization.dto.OrgDtos.*;
import com.qrwait.organization.service.OrganizationService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/organization")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<OrganizationDto> getOrganization(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(organizationService.getMyOrganization(principal.organizationId()));
    }

    @PutMapping
    @PreAuthorize("hasRole('OWNER')")
    public ApiResponse<OrganizationDto> updateOrganization(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpdateOrganizationRequest req) {
        return ApiResponse.ok(organizationService.updateOrganization(principal.organizationId(), req));
    }

    @PostMapping("/logo")
    @PreAuthorize("hasRole('OWNER')")
    public ApiResponse<Map<String, String>> uploadLogo(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam("file") MultipartFile file) {
        String logoUrl = organizationService.uploadLogo(principal.organizationId(), file);
        return ApiResponse.ok(Map.of("logoUrl", logoUrl));
    }
}
