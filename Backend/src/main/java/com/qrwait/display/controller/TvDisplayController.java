package com.qrwait.display.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.display.dto.TvDisplayDtos.*;
import com.qrwait.display.service.TvDisplayService;
import com.qrwait.iam.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class TvDisplayController {

    private final TvDisplayService tvDisplayService;

    public TvDisplayController(TvDisplayService tvDisplayService) {
        this.tvDisplayService = tvDisplayService;
    }

    @PostMapping("/branches/{branchId}/screen-tokens")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<ScreenTokenDto> generateScreenToken(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID branchId) {
        return ApiResponse.ok(tvDisplayService.generateScreenToken(principal, branchId));
    }

    @GetMapping("/public/display/{screenToken}")
    public ApiResponse<TvDisplayBootstrapDto> getTvBootstrap(@PathVariable String screenToken) {
        return ApiResponse.ok(tvDisplayService.getBootstrap(screenToken));
    }
}
