package com.qrwait.iam.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.dto.AuthDtos.*;
import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.iam.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ApiResponse<List<UserSummaryDto>> listUsers(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(required = false) UUID branchId) {
        return ApiResponse.ok(userService.listUsers(principal, branchId));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserSummaryDto> createUser(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateUserRequest req) {
        return ApiResponse.ok(userService.createStaffAccount(principal, req));
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<UserSummaryDto> updateStatus(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserStatusRequest req) {
        return ApiResponse.ok(userService.updateUserStatus(principal, id, req));
    }
}
