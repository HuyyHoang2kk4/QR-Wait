package com.qrwait.queue.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.queue.dto.QueueDtos.*;
import com.qrwait.queue.service.QueueService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    @GetMapping("/branches/{branchId}/queues")
    public ApiResponse<List<QueueDto>> listQueues(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID branchId) {
        return ApiResponse.ok(queueService.listQueues(principal, branchId));
    }

    @PostMapping("/branches/{branchId}/queues")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<QueueDto> createQueue(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID branchId,
            @Valid @RequestBody CreateQueueRequest req) {
        return ApiResponse.ok(queueService.createQueue(principal, branchId, req));
    }

    @PutMapping("/queues/{queueId}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ApiResponse<QueueDto> updateQueue(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId,
            @Valid @RequestBody UpdateQueueRequest req) {
        return ApiResponse.ok(queueService.updateQueue(principal, queueId, req));
    }

    @PatchMapping("/queues/{queueId}/status")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER', 'STAFF')")
    public ApiResponse<QueueDto> updateStatus(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId,
            @Valid @RequestBody UpdateQueueStatusRequest req) {
        return ApiResponse.ok(queueService.updateQueueStatus(principal, queueId, req));
    }

    @PostMapping("/queues/{queueId}/sessions/reset")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER', 'STAFF')")
    public ApiResponse<QueueSessionDto> startNewSession(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId,
            @RequestBody(required = false) ResetSessionRequest req) {
        return ApiResponse.ok(queueService.startNewSession(principal, queueId,
                req == null ? new ResetSessionRequest(true) : req));
    }
}
