package com.qrwait.ticket.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.ticket.dto.TicketDtos.*;
import com.qrwait.ticket.service.TicketPublicService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public")
public class PublicTicketController {

    private final TicketPublicService ticketPublicService;

    public PublicTicketController(TicketPublicService ticketPublicService) {
        this.ticketPublicService = ticketPublicService;
    }

    @GetMapping("/checkin/{qrToken}")
    public ApiResponse<CheckinContextDto> getCheckinContext(
            @PathVariable String qrToken,
            @RequestHeader(value = "X-Device-Token", required = false) String deviceToken) {
        return ApiResponse.ok(ticketPublicService.getCheckinContext(qrToken, deviceToken));
    }

    @PostMapping("/tickets")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<TicketDetailDto> createTicket(@Valid @RequestBody CreatePublicTicketRequest req) {
        return ApiResponse.ok(ticketPublicService.createPublicTicket(req));
    }

    @GetMapping("/tickets/{ticketId}")
    public ApiResponse<TicketDetailDto> getTicketDetail(
            @PathVariable UUID ticketId,
            @RequestHeader(value = "X-Device-Token", required = false) String deviceToken) {
        return ApiResponse.ok(ticketPublicService.getTicketDetail(ticketId, deviceToken));
    }

    @PostMapping("/tickets/{ticketId}/ack")
    public ApiResponse<TicketDetailDto> acknowledgeArrival(
            @PathVariable UUID ticketId,
            @RequestHeader("X-Device-Token") String deviceToken) {
        return ApiResponse.ok(ticketPublicService.acknowledgeArrival(ticketId, deviceToken));
    }

    @PostMapping("/tickets/{ticketId}/cancel")
    public ApiResponse<TicketDetailDto> cancelTicket(
            @PathVariable UUID ticketId,
            @RequestHeader("X-Device-Token") String deviceToken,
            @RequestBody(required = false) CancelTicketRequest req) {
        return ApiResponse.ok(ticketPublicService.cancelByCustomer(ticketId, deviceToken,
                req == null ? new CancelTicketRequest(null) : req));
    }
}
