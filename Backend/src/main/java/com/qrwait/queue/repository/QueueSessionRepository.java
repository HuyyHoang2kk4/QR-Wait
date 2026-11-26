package com.qrwait.queue.repository;

import com.qrwait.queue.entity.QueueSession;
import com.qrwait.queue.entity.QueueSessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface QueueSessionRepository extends JpaRepository<QueueSession, UUID> {
    Optional<QueueSession> findFirstByQueueIdAndStatusOrderBySessionNumberDesc(UUID queueId, QueueSessionStatus status);
}
