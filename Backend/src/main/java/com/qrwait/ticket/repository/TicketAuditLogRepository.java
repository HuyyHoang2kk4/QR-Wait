package com.qrwait.ticket.repository;

import com.qrwait.ticket.entity.TicketAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TicketAuditLogRepository extends JpaRepository<TicketAuditLog, UUID> {
    List<TicketAuditLog> findByTicketIdOrderByTransitionAtDesc(UUID ticketId);
}
