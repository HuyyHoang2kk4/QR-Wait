package com.qrwait.iam.dto;

import com.qrwait.iam.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public final class AuthDtos {

    private AuthDtos() {
    }

    public record RegisterRequest(
            @NotBlank @Email @Size(max = 100) String email,
            @NotBlank @Size(min = 8, max = 100) String password,
            @NotBlank @Size(min = 2, max = 50) String displayName,
            @NotBlank @Size(min = 2, max = 100) String organizationName
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    public record GoogleLoginRequest(
            @NotBlank String idToken,
            String organizationName
    ) {}

    public record RefreshTokenRequest(
            @NotBlank String refreshToken
    ) {}

    public record AuthResponse(
            String accessToken,
            String refreshToken,
            UserSummaryDto user
    ) {}

    public record UserSummaryDto(
            UUID id,
            UUID organizationId,
            String displayName,
            String email,
            UserRole role,
            boolean isActive,
            List<UUID> branchIds
    ) {}

    public record CreateUserRequest(
            @NotBlank @Size(min = 2, max = 50) String displayName,
            @NotBlank @Email @Size(max = 100) String email,
            @NotBlank @Size(min = 6, max = 100) String password,
            @NotNull UserRole role,
            @NotEmpty List<UUID> branchIds
    ) {}

    public record UpdateUserStatusRequest(
            boolean isActive
    ) {}
}
