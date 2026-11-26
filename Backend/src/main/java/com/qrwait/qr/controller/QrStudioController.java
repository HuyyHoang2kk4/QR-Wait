package com.qrwait.qr.controller;

import com.qrwait.common.dto.ApiResponse;
import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.qr.service.QrStudioService;
import com.qrwait.qr.service.QrStudioService.QrRotateResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/queues/{queueId}/qr")
public class QrStudioController {

    private final QrStudioService qrStudioService;

    public QrStudioController(QrStudioService qrStudioService) {
        this.qrStudioService = qrStudioService;
    }

    @PostMapping("/rotate")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER', 'STAFF')")
    public ApiResponse<QrRotateResponse> rotateQr(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId) {
        return ApiResponse.ok(qrStudioService.rotateQrToken(principal, queueId));
    }

    @GetMapping("/poster")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<byte[]> downloadPoster(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID queueId,
            @RequestParam(defaultValue = "pdf") String format,
            @RequestParam(defaultValue = "A4") String paper,
            @RequestParam(defaultValue = "#4F46E5") String accentColor) {
        byte[] content = qrStudioService.generatePoster(principal, queueId, format, paper, accentColor);
        boolean isPng = "png".equalsIgnoreCase(format);
        MediaType mediaType = isPng ? MediaType.IMAGE_PNG : MediaType.APPLICATION_PDF;
        String ext = isPng ? "png" : "pdf";
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"qr-poster-" + paper + "." + ext + "\"")
                .body(content);
    }
}
