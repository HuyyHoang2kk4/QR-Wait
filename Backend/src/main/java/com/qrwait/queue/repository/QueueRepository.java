package com.qrwait.queue.repository;

import com.qrwait.queue.entity.Queue;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QueueRepository extends JpaRepository<Queue, UUID> {
    List<Queue> findByBranchId(UUID branchId);
    Optional<Queue> findByQrToken(String qrToken);
    boolean existsByBranchIdAndPrefixIgnoreCase(UUID branchId, String prefix);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT q FROM Queue q WHERE q.id = :queueId")
    Optional<Queue> findByIdForUpdate(UUID queueId);
}
