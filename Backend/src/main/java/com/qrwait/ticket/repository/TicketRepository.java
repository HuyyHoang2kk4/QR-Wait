package com.qrwait.ticket.repository;

import com.qrwait.ticket.entity.Ticket;
import com.qrwait.ticket.entity.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    /**
     * Lay 1 ve WAITING tiep theo theo FIFO (uu tien ve phuc hoi is_restored = true)
     * va khoa dong bang SKIP LOCKED de tranh 2 quay goi trung 1 khach (BRL-008).
     */
    @Query(value = """
            SELECT * FROM tickets
            WHERE queue_id = :queueId
              AND session_id = :sessionId
              AND status = 'WAITING'
            ORDER BY is_restored DESC, sequence_number ASC, created_at ASC
            LIMIT 1
            FOR UPDATE SKIP LOCKED
            """, nativeQuery = true)
    Optional<Ticket> findNextWaitingForUpdateSkipLocked(UUID queueId, UUID sessionId);

    /**
     * Quet toi da 100 ve NO_SHOW da qua han 15 phut de tu dong huy (FR-033, BRL-007).
     */
    @Query(value = """
            SELECT * FROM tickets
            WHERE status = 'NO_SHOW'
              AND cancel_scheduled_at <= :now
            LIMIT 100
            FOR UPDATE SKIP LOCKED
            """, nativeQuery = true)
    List<Ticket> findExpiredNoShowBatchForUpdate(Instant now);

    Optional<Ticket> findFirstByQueueIdAndDeviceTokenAndStatusIn(
            UUID queueId, String deviceToken, Collection<TicketStatus> activeStatuses);

    List<Ticket> findByQueueIdAndSessionIdAndStatusInOrderByIsRestoredDescSequenceNumberAsc(
            UUID queueId, UUID sessionId, Collection<TicketStatus> statuses);

    long countByQueueIdAndSessionIdAndStatus(UUID queueId, UUID sessionId, TicketStatus status);
}
