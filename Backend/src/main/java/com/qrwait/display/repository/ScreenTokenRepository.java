package com.qrwait.display.repository;

import com.qrwait.display.entity.ScreenToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ScreenTokenRepository extends JpaRepository<ScreenToken, UUID> {
    Optional<ScreenToken> findByTokenAndIsActiveTrue(String token);
    List<ScreenToken> findByBranchIdAndIsActiveTrue(UUID branchId);
}
