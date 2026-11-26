package com.qrwait.queue.dto;

import com.qrwait.queue.entity.QueueSessionStatus;
import com.qrwait.queue.entity.QueueStatus;
import jakarta.validation.constraints.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public final class QueueDtos {

    private QueueDtos() {
    }

    public record QueueDto(
            UUID id,
            UUID branchId,
            String name,
            String prefix,
            int avgServiceMinutes,
            int minPartySize,
            int maxPartySize,
            QueueStatus status,
            String qrToken,
            boolean rotateQrOnSession,
            int currentSequence
    ) {}

    public record CreateQueueRequest(
            @NotBlank @Size(min = 2, max = 100) String name,
            @NotBlank @Pattern(regexp = "^[A-Z]{1,3}$", message = "Prefix chi gom 1-3 chu cai in hoa") String prefix,
            @Min(1) int avgServiceMinutes,
            @Min(1) int minPartySize,
            @Min(1) int maxPartySize,
            boolean rotateQrOnSession
    ) {}

    public record UpdateQueueRequest(
            @NotBlank @Size(min = 2, max = 100) String name,
            @Min(1) int avgServiceMinutes,
            @Min(1) int minPartySize,
            @Min(1) int maxPartySize,
            boolean rotateQrOnSession
    ) {}

    public record UpdateQueueStatusRequest(@NotNull QueueStatus status) {}

    public record ResetSessionRequest(boolean confirmExpirePending) {}

    public record QueueSessionDto(
            UUID id,
            UUID queueId,
            int sessionNumber,
            Instant startedAt,
            QueueSessionStatus status
    ) {}

    public record CounterDto(UUID id, UUID branchId, String name, boolean isActive, List<UUID> queueIds) {}

    public record UpsertCounterRequest(
            @NotBlank @Size(max = 50) String name,
            boolean isActive,
            @NotEmpty List<UUID> queueIds
    ) {}
}
