package com.qrwait.qr.service;

import com.qrwait.iam.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Module M4: Sinh Poster QR chuan in an PDF/PNG (ZXing + OpenPDF) & Doi ma QR moi (FR-012, FR-013, BRL-003).
 */
@Service
public class QrStudioService {

    public record QrRotateResponse(UUID queueId, String qrToken, String checkinUrl) {}

    /**
     * Doi ma QR moi thu cong (vo hieu hoa ma cu ngay lap tuc va day len TV Display) (FR-013, BRL-003).
     */
    @Transactional
    public QrRotateResponse rotateQrToken(UserPrincipal actor, UUID queueId) {
        // TODO:
        // 1. Sinh qrToken moi qua TokenGenerator.nextHexToken(16), cap nhat vao queue.qrToken.
        // 2. Sau commit (AFTER_COMMIT), day TV_QR_ROTATED qua WebSocket /topic/branch/{branchId}/tv.
        throw new UnsupportedOperationException("TODO: Implement QrStudioService.rotateQrToken (FR-013)");
    }

    /**
     * Sinh file Poster QR in an (A4 / A5 / DESK) dang PDF 300 DPI hoac anh PNG bang ZXing + OpenPDF (FR-012).
     */
    @Transactional(readOnly = true)
    public byte[] generatePoster(UserPrincipal actor, UUID queueId, String format, String paperSize, String accentColor) {
        // TODO: Dung ZXing QRCodeWriter + OpenPDF Document (hoac MatrixToImageWriter cho PNG)
        throw new UnsupportedOperationException("TODO: Implement QrStudioService.generatePoster (FR-012)");
    }
}
