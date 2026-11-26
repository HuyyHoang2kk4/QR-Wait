package com.qrwait.analytics.controller;

import com.qrwait.analytics.dto.AnalyticsDtos.AnalyticsOverviewDto;
import com.qrwait.analytics.service.AnalyticsService;
import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.security.UserPrincipal;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/analytics")
@PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/overview")
    public ApiResponse<AnalyticsOverviewDto> getOverview(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam UUID branchId,
            @RequestParam(required = false) UUID queueId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ApiResponse.ok(analyticsService.getOverview(principal, branchId, queueId, from, to));
    }

    @GetMapping("/export")
    public ResponseEntity<StreamingResponseBody> exportCsv(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam UUID branchId,
            @RequestParam(required = false) UUID queueId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        String dateTag = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        String filename = "QRWait_Export_" + branchId.toString().substring(0, 8) + "_" + dateTag + ".csv";
        StreamingResponseBody body = out -> analyticsService.streamCsvExport(principal, branchId, queueId, from, to, out);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/csv; charset=UTF-8"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(body);
    }
}
