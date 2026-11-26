package com.qrwait.queue.repository;

import com.qrwait.queue.entity.Counter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CounterRepository extends JpaRepository<Counter, UUID> {
    List<Counter> findByBranchId(UUID branchId);
    long countByBranchIdAndIsActiveTrue(UUID branchId);
}
