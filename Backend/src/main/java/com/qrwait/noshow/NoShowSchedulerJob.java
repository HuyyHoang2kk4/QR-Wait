package com.qrwait.noshow;

import com.qrwait.ticket.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Module M7: Tien trinh chay ngam moi 15 giay quet va tu dong huy ve NO_SHOW qua 15 phut (FR-033, BRL-007).
 */
@Component
public class NoShowSchedulerJob {

    private static final Logger log = LoggerFactory.getLogger(NoShowSchedulerJob.class);

    private final TicketRepository ticketRepository;

    public NoShowSchedulerJob(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    /**
     * Quet toi da 100 ve NO_SHOW co cancel_scheduled_at <= now() va chuyen sang CANCELLED.
     *
     * <p>Thuat toan (Detailed Design Muc 5.4):
     * 1. Goi ticketRepository.findExpiredNoShowBatchForUpdate(Instant.now()).
     * 2. Neu danh sach rong -> ket thuc som.
     * 3. Voi moi ve: doi status = CANCELLED, cancelledAt = now, cancellationReason = "NO_SHOW_TIMEOUT_15MIN".
     * 4. Ghi TicketAuditLog (NO_SHOW -> CANCELLED).
     * 5. Sau commit, ban TICKET_CANCELLED toi /topic/ticket/{ticketId} va STAFF_QUEUE_UPDATED toi Staff Panel.
     */
    @Scheduled(fixedDelay = 15_000)
    @Transactional
    public void cancelExpiredNoShowTickets() {
        // TODO: Trien khai luong FR-033 theo Javadoc phia tren (chu y khong nem exception lam chet scheduler)
        log.trace("NoShowSchedulerJob heartbeat (chua trien khai logic TODO)");
    }
}
