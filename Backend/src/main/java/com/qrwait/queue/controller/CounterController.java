package com.qrwait.queue.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.queue.dto.QueueDtos.*;
import com.qrwait.queue.service.CounterService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CounterController {

    private final CounterService counterService;

    public CounterController(CounterService counterService) {
        this.counterService = counterService;
    }

    @GetMapping("/branches/{branchId}/counters")
    public ApiResponse<List<CounterDto>> listCounters(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID branchId) {
        return ApiResponse.ok(counterService.listCounters(principal, branchId));
    }

    @PostMapping("/branches/{branchId}/counters")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<CounterDto> createCounter(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID branchId,
            @Valid @RequestBody UpsertCounterRequest req) {
        return ApiResponse.ok(counterService.createCounter(principal, branchId, req));
    }

    @PutMapping("/counters/{counterId}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<CounterDto> updateCounter(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID counterId,
            @Valid @RequestBody UpsertCounterRequest req) {
        return ApiResponse.ok(counterService.updateCounter(principal, counterId, req));
    }
}
