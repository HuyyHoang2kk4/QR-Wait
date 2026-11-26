package com.qrwait.organization.service;

import com.qrwait.organization.dto.OrgDtos.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * Module M2: Ho so to chuc & Upload Logo thuong hieu len Cloud Object Storage (FR-005).
 */
@Service
public class OrganizationService {

    @Transactional(readOnly = true)
    public OrganizationDto getMyOrganization(UUID orgId) {
        // TODO: Tim Organization theo orgId va map sang OrganizationDto
        throw new UnsupportedOperationException("TODO: Implement OrganizationService.getMyOrganization (FR-005)");
    }

    @Transactional
    public OrganizationDto updateOrganization(UUID orgId, UpdateOrganizationRequest req) {
        // TODO: Cap nhat ten va mui gio cho Organization
        throw new UnsupportedOperationException("TODO: Implement OrganizationService.updateOrganization (FR-005)");
    }

    /**
     * Tai file Logo (JPG/PNG/SVG <= 2MB) len Supabase Storage / Cloudinary va luu logoUrl (FR-005).
     */
    @Transactional
    public String uploadLogo(UUID orgId, MultipartFile file) {
        // TODO: Kiem tra content-type & kich thuoc <= 2MB -> upload Storage -> cap nhat organization.logoUrl
        throw new UnsupportedOperationException("TODO: Implement OrganizationService.uploadLogo (FR-005)");
    }
}
