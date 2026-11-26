package com.qrwait.ticket.service;

import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.ticket.dto.TicketDtos.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Module M6, M7 (Restore) & M9 (Walk-in): DieU phoi Staff Panel 1 cham & Khoa da tang (FR-024..030, FR-032, FR-037).
 */
@Service
public class TicketStaffService {

    @Transactional(readOnly = true)
    public StaffQueueStateDto getStaffQueueState(UserPrincipal actor, UUID queueId, UUID counterId) {
        // TODO: Lay currentCounterTicket (CALLED/SERVING cua counterId), danh sach WAITING va NO_SHOW
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.getStaffQueueState");
    }

    /**
     * Goi khach tiep theo theo FIFO bang SELECT ... FOR UPDATE SKIP LOCKED (FR-025, BRL-008, BRL-011).
     *
     * <p>Thuat toan (Detailed Design Muc 5.2):
     * 1. Xac thuc counterId thuoc chi nhanh & dang isActive = true (khong hop le -> ERR_COUNTER_REQUIRED).
     * 2. Lay QueueSession ACTIVE; goi ticketRepository.findNextWaitingForUpdateSkipLocked(queueId, sessionId).
     * 3. Neu rong -> nem ERR_NO_WAITING_TICKETS (400).
     * 4. Cap nhat status = CALLED, counter, staff, calledAt = now, recallCount = 0, isAcknowledged = false.
     * 5. Ghi TicketAuditLog (WAITING -> CALLED).
     * 6. Sau commit (AFTER_COMMIT): phat TICKET_CALLED, TV_CALL_ANNOUNCE (Ding Dong + TTS), QUEUE_PROGRESS_UPDATED.
     * 7. Dong ho 2 phut chi chay phia client tu calledAt va KHONG khoa thao tac Vang mat / Goi tiep.
     */
    @Transactional
    public TicketStaffDto callNext(UserPrincipal actor, UUID queueId, CallNextRequest req) {
        // TODO: Trien khai luong FR-025 theo Javadoc phia tren
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.callNext (FR-025)");
    }

    /**
     * Goi lai khach toi da 3 lan, gian cach toi thieu 15 giay (FR-026, BRL-006).
     *
     * <p>Kiem tra:
     * - version khop -> ERR_CONCURRENT_CONFLICT.
     * - status == CALLED.
     * - recallCount < 3 -> neu >= 3 nem ERR_RECALL_LIMIT_EXCEEDED (400).
     * - lastRecalledAt (hoac calledAt) cach hien tai >= 15s -> neu chua du nem ERR_RECALL_RATE_LIMITED (429).
     */
    @Transactional
    public TicketStaffDto recall(UserPrincipal actor, UUID ticketId, TicketActionRequest req) {
        // TODO: Trien khai luong FR-026
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.recall (FR-026)");
    }

    /**
     * Bat dau phuc vu khach khi khach da toi quay: CALLED -> SERVING (FR-027, FR-022).
     */
    @Transactional
    public TicketStaffDto startServing(UserPrincipal actor, UUID ticketId, TicketActionRequest req) {
        // TODO: Kiem tra @Version & CALLED -> chuyen SERVING, servingAt = now, day TICKET_SERVING toi khach & TV
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.startServing (FR-027)");
    }

    /**
     * Hoan tat phuc vu: SERVING -> COMPLETED, giai phong thiet bi khach & quay (FR-028).
     */
    @Transactional
    public TicketStaffDto complete(UserPrincipal actor, UUID ticketId, TicketActionRequest req) {
        // TODO: Kiem tra @Version & SERVING -> COMPLETED, completedAt = now, day TICKET_COMPLETED & TV_STATE_SYNC
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.complete (FR-028)");
    }

    /**
     * Danh dau vang mat: CALLED -> NO_SHOW & hen gio tu huy sau 15 phut (FR-029, BRL-007).
     *
     * <p>Gan noshowAt = now, cancelScheduledAt = now + 15 phut. Giai phong quay de goi khach tiep ngay.
     */
    @Transactional
    public TicketStaffDto markNoShow(UserPrincipal actor, UUID ticketId, TicketActionRequest req) {
        // TODO: Trien khai luong FR-029
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.markNoShow (FR-029)");
    }

    /**
     * Phuc hoi ve NO_SHOW trong thoi gian an han < 15 phut (FR-032, BRL-007).
     *
     * <p>Neu Instant.now().isAfter(cancelScheduledAt) -> nem ERR_NOSHOW_RESTORE_EXPIRED (410).
     * Nguoc lai chuyen WAITING, isRestored = true de uu tien len dau hang cho.
     */
    @Transactional
    public TicketStaffDto restoreNoShow(UserPrincipal actor, UUID ticketId, TicketActionRequest req) {
        // TODO: Trien khai luong FR-032
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.restoreNoShow (FR-032)");
    }

    /**
     * Chuyen luot ve sang Quay khac hoac Hang cho khac (FR-030).
     */
    @Transactional
    public TicketStaffDto transfer(UserPrincipal actor, UUID ticketId, TransferTicketRequest req) {
        // TODO: Chuyen counterId (giu nguyen so) hoac chuyen queueId (chuyen ve WAITING uu tien dau hang)
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.transfer (FR-030)");
    }

    /**
     * Tao ve thu cong cho khach vang lai khong smartphone (FR-037, FR-038).
     *
     * <p>Dat isWalkin = true, deviceToken = null, cap so FIFO chung hang cho.
     */
    @Transactional
    public TicketStaffDto createWalkin(UserPrincipal actor, UUID queueId, CreateWalkinRequest req) {
        // TODO: Trien khai luong FR-037 & FR-038
        throw new UnsupportedOperationException("TODO: Implement TicketStaffService.createWalkin (FR-037)");
    }
}
