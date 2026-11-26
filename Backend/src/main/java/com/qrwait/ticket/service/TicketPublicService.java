package com.qrwait.ticket.service;

import com.qrwait.ticket.dto.TicketDtos.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Module M5: Trai nghiem khach hang quet QR lay so FIFO, Live Tracking, Xac nhan dang den & Tu huy (FR-014..023).
 */
@Service
public class TicketPublicService {

    /**
     * Lay thong tin hang cho tu qrToken va kiem tra xem deviceToken da co ve Active hay chua (FR-015, FR-016, FR-018).
     *
     * <p>Thuat toan:
     * 1. Tim Queue theo qrToken; khong thay -> nem ERR_QR_CODE_REVOKED (410).
     * 2. Neu deviceToken != null: kiem tra co ve Active (WAITING, CALLED, SERVING, NO_SHOW) -> gan activeTicketId de FE redirect.
     * 3. Tinh waitingCount va estimatedWaitMinutes theo cong thuc BRL-004.
     */
    @Transactional(readOnly = true)
    public CheckinContextDto getCheckinContext(String qrToken, String deviceToken) {
        // TODO: Trien khai theo Javadoc phia tren
        throw new UnsupportedOperationException("TODO: Implement TicketPublicService.getCheckinContext (FR-016/018)");
    }

    /**
     * Cap ve thu tu FIFO khi khach gui form check-in (FR-014, FR-017, FR-019, BRL-001..005, BRL-009).
     *
     * <p>Thuat toan (Detailed Design Muc 5.1):
     * 1. Sanitize displayName (XssSanitizer.sanitize) & validate do dai 2..30 -> ERR_NAME_REQUIRED.
     * 2. Tim Queue theo req.qrToken -> khong thay nem ERR_QR_CODE_REVOKED; khac OPEN nem ERR_QUEUE_PAUSED_CLOSED.
     * 3. Kiem tra partySize trong [minPartySize, maxPartySize] -> ERR_PARTY_SIZE_INVALID.
     * 4. Neu branch.isGeoEnabled(): bat buoc co lat/lng (khong co -> ERR_GPS_PERMISSION_DENIED),
     *    tinh HaversineUtil.distanceMeters(...) > gpsRadiusMeters -> ERR_OUT_OF_GPS_RADIUS.
     * 5. Chong spam: tim ve Active theo (queueId, deviceToken) -> neu co nem ERR_ACTIVE_TICKET_EXISTS kem activeTicketId.
     * 6. Khoa Queue bang findByIdForUpdate, tang currentSequence += 1, format ticketNumber = prefix + "-" + %03d.
     * 7. Luu Ticket (WAITING) + TicketAuditLog; bat DataIntegrityViolationException de phong double-submit.
     * 8. Sau commit (AFTER_COMMIT), day STAFF_QUEUE_UPDATED & QUEUE_PROGRESS_UPDATED qua WebSocket.
     */
    @Transactional
    public TicketDetailDto createPublicTicket(CreatePublicTicketRequest req) {
        // TODO: Trien khai luong FR-017 theo Javadoc phia tren
        throw new UnsupportedOperationException("TODO: Implement TicketPublicService.createPublicTicket (FR-017)");
    }

    /**
     * Lay chi tiet ve Live Tracking kem so nhom phia truoc & thoi gian cho uoc tinh (FR-020, BRL-004).
     */
    @Transactional(readOnly = true)
    public TicketDetailDto getTicketDetail(UUID ticketId, String deviceToken) {
        // TODO: Dem so ve WAITING co sequenceNumber nho hon trong cung session, tinh uoc tinh theo so quay active
        throw new UnsupportedOperationException("TODO: Implement TicketPublicService.getTicketDetail (FR-020)");
    }

    /**
     * Khach hang bam "TOI DANG DEN / DA TOI" -> Dong bo 2 chieu sang Staff Panel (FR-022).
     *
     * <p>Quy tac bat buoc: Chi dat isAcknowledged = true va giu nguyen trang thai CALLED
     * (khong tu nhay sang SERVING de tranh khach bam khong tu xa). Phat STAFF_CUSTOMER_ACK sau commit.
     */
    @Transactional
    public TicketDetailDto acknowledgeArrival(UUID ticketId, String deviceToken) {
        // TODO: Trien khai luong FR-022
        throw new UnsupportedOperationException("TODO: Implement TicketPublicService.acknowledgeArrival (FR-022)");
    }

    /**
     * Khach hang chu dong huy luot cho khi ve dang WAITING (FR-023).
     *
     * <p>Luu y: Neu ve da sang CALLED hoac SERVING -> nem ERR_INVALID_STATE_TRANSITION.
     * Sau khi huy -> giai phong device_token & day STAFF_QUEUE_UPDATED / QUEUE_PROGRESS_UPDATED.
     */
    @Transactional
    public TicketDetailDto cancelByCustomer(UUID ticketId, String deviceToken, CancelTicketRequest req) {
        // TODO: Trien khai luong FR-023
        throw new UnsupportedOperationException("TODO: Implement TicketPublicService.cancelByCustomer (FR-023)");
    }
}
