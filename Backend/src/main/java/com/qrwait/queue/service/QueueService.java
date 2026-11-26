package com.qrwait.queue.service;

import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.queue.dto.QueueDtos.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Module M3: Quan ly Hang cho, Trang thai OPEN/PAUSED/CLOSED & Mo Phien moi Reset 001 (FR-008..010).
 */
@Service
public class QueueService {

    @Transactional(readOnly = true)
    public List<QueueDto> listQueues(UserPrincipal actor, UUID branchId) {
        // TODO: Kiem tra quyen chi nhanh va tra danh sach Queue thuoc branchId
        throw new UnsupportedOperationException("TODO: Implement QueueService.listQueues");
    }

    /**
     * Tao Hang cho moi kem Phien #1 va qr_token mac dinh (FR-008, BRL-001, BRL-005).
     */
    @Transactional
    public QueueDto createQueue(UserPrincipal actor, UUID branchId, CreateQueueRequest req) {
        // TODO:
        // 1. Kiem tra prefix khong trung trong cung branchId -> ERR_DUPLICATE_RESOURCE.
        // 2. Kiem tra minPartySize <= maxPartySize -> ERR_PARTY_SIZE_INVALID.
        // 3. Sinh qrToken ngau nhien (TokenGenerator.nextHexToken(16)) & tao QueueSession #1 ACTIVE.
        throw new UnsupportedOperationException("TODO: Implement QueueService.createQueue (FR-008)");
    }

    @Transactional
    public QueueDto updateQueue(UserPrincipal actor, UUID queueId, UpdateQueueRequest req) {
        // TODO: Cap nhat ten, avgServiceMinutes, partySize, rotateQrOnSession
        throw new UnsupportedOperationException("TODO: Implement QueueService.updateQueue (FR-008)");
    }

    /**
     * Chuyen trang thai hang cho OPEN / PAUSED / CLOSED va phat WS dong bo (FR-009).
     */
    @Transactional
    public QueueDto updateQueueStatus(UserPrincipal actor, UUID queueId, UpdateQueueStatusRequest req) {
        // TODO: Cap nhat queue.status va phat QUEUE_STATUS_CHANGED len /topic/queue/{queueId}
        throw new UnsupportedOperationException("TODO: Implement QueueService.updateQueueStatus (FR-009)");
    }

    /**
     * Mo Phien lam viec moi & Dat lai so ve ve 001 (FR-010, BRL-010, BRL-003).
     *
     * <p>Thuat toan can trien khai (Detailed Design Muc 5.5):
     * 1. Khoa dong Queue bang queueRepository.findByIdForUpdate(queueId).
     * 2. Dong QueueSession ACTIVE cu (status=CLOSED, endedAt=now).
     * 3. Chuyen toan bo ve chua hoan tat (WAITING, CALLED, SERVING, NO_SHOW) sang EXPIRED & ghi AuditLog.
     * 4. Tao QueueSession moi voi sessionNumber + 1, dat queue.currentSequence = 0.
     * 5. Neu queue.isRotateQrOnSession() == true -> sinh qrToken moi & ban TV_QR_ROTATED qua WS.
     * 6. Phat TICKET_EXPIRED & QUEUE_SESSION_RESET sau commit.
     */
    @Transactional
    public QueueSessionDto startNewSession(UserPrincipal actor, UUID queueId, ResetSessionRequest req) {
        // TODO: Trien khai luong FR-010 theo Javadoc phia tren
        throw new UnsupportedOperationException("TODO: Implement QueueService.startNewSession (FR-010)");
    }
}
