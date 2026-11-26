package com.qrwait.ticket.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.ticket.dto.TicketDtos.*;
import com.qrwait.ticket.service.TicketStaffService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/staff")
@PreAuthorize("hasAnyRole('STAFF', 'MANAGER', 'OWNER')")
public class StaffTicketController {

    private final TicketStaffService ticketStaffService;

    public StaffTicketController(TicketStaffService ticketStaffService) {
        this.ticketStaffService = ticketStaffService;
    }

    @GetMapping("/queues/{queueId}/state")
    public ApiResponse<StaffQueueStateDto> getState(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId,
            @RequestParam(required = false) UUID counterId) {
        return ApiResponse.ok(ticketStaffService.getStaffQueueState(principal, queueId, counterId));
    }

    @PostMapping("/queues/{queueId}/call-next")
    public ApiResponse<TicketStaffDto> callNext(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId,
            @Valid @RequestBody CallNextRequest req) {
        return ApiResponse.ok(ticketStaffService.callNext(principal, queueId, req));
    }

    @PostMapping("/tickets/{ticketId}/recall")
    public ApiResponse<TicketStaffDto> recall(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @RequestBody TicketActionRequest req) {
        return ApiResponse.ok(ticketStaffService.recall(principal, ticketId, req));
    }

    @PostMapping("/tickets/{ticketId}/serve")
    public ApiResponse<TicketStaffDto> startServing(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @RequestBody TicketActionRequest req) {
        return ApiResponse.ok(ticketStaffService.startServing(principal, ticketId, req));
    }

    @PostMapping("/tickets/{ticketId}/complete")
    public ApiResponse<TicketStaffDto> complete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @RequestBody TicketActionRequest req) {
        return ApiResponse.ok(ticketStaffService.complete(principal, ticketId, req));
    }

    @PostMapping("/tickets/{ticketId}/noshow")
    public ApiResponse<TicketStaffDto> markNoShow(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @RequestBody TicketActionRequest req) {
        return ApiResponse.ok(ticketStaffService.markNoShow(principal, ticketId, req));
    }

    @PostMapping("/tickets/{ticketId}/restore")
    public ApiResponse<TicketStaffDto> restoreNoShow(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @RequestBody TicketActionRequest req) {
        return ApiResponse.ok(ticketStaffService.restoreNoShow(principal, ticketId, req));
    }

    @PostMapping("/tickets/{ticketId}/transfer")
    public ApiResponse<TicketStaffDto> transfer(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @Valid @RequestBody TransferTicketRequest req) {
        return ApiResponse.ok(ticketStaffService.transfer(principal, ticketId, req));
    }

    @PostMapping("/queues/{queueId}/walkin")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<TicketStaffDto> createWalkin(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId,
            @Valid @RequestBody CreateWalkinRequest req) {
        return ApiResponse.ok(ticketStaffService.createWalkin(principal, queueId, req));
    }
}
