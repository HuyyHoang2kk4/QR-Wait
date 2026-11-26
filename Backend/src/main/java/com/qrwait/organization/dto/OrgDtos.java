package com.qrwait.organization.dto;

import jakarta.validation.constraints.*;
import java.util.UUID;

public final class OrgDtos {

    private OrgDtos() {
    }

    public record OrganizationDto(UUID id, String name, String logoUrl, String timezone) {}

    public record UpdateOrganizationRequest(
            @NotBlank @Size(min = 2, max = 100) String name,
            @NotBlank @Size(max = 50) String timezone
    ) {}

    public record BranchDto(
            UUID id,
            UUID organizationId,
            String name,
            String address,
            double latitude,
            double longitude,
            boolean isGeoEnabled,
            int gpsRadiusMeters,
            boolean ttsEnabled,
            boolean isActive
    ) {}

    public record UpsertBranchRequest(
            @NotBlank @Size(min = 2, max = 100) String name,
            @NotBlank @Size(max = 255) String address,
            @DecimalMin("-90.0") @DecimalMax("90.0") double latitude,
            @DecimalMin("-180.0") @DecimalMax("180.0") double longitude
    ) {}

    public record UpdateGeoConfigRequest(
            boolean isGeoEnabled,
            @Min(30) @Max(500) int gpsRadiusMeters
    ) {}

    public record UpdateTtsConfigRequest(boolean ttsEnabled) {}
}
