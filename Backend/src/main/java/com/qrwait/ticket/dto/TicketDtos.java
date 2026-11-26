package com.qrwait.ticket.dto;

import com.qrwait.queue.entity.QueueStatus;
import com.qrwait.ticket.entity.TicketStatus;
import jakarta.validation.constraints.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public final class TicketDtos {

    private TicketDtos() {
    }

    public record CheckinContextDto(
            UUID organizationId,
            String organizationName,
            String logoUrl,
            UUID branchId,
            String branchName,
            UUID queueId,
            String queueName,
            String prefix,
            QueueStatus queueStatus,
            int minPartySize,
            int maxPartySize,
            boolean isGeoEnabled,
            int gpsRadiusMeters,
            long waitingCount,
            int estimatedWaitMinutes,
            UUID activeTicketId
    ) {}

    public record CreatePublicTicketRequest(
            @NotBlank String qrToken,
            @NotBlank @Size(min = 2, max = 30) String displayName,
            @Size(max = 255) String notes,
            @Min(1) int partySize,
            @NotBlank @Size(max = 64) String deviceToken,
            Double latitude,
            Double longitude
    ) {}

    public record CancelTicketRequest(@Size(max = 255) String reason) {}

    public record TicketDetailDto(
            UUID id,
            UUID queueId,
            String queueName,
            String branchName,
            String ticketNumber,
            String displayName,
            int partySize,
            String notes,
            TicketStatus status,
            String counterName,
            long aheadCount,
            int estimatedWaitMinutes,
            boolean isAcknowledged,
            Instant calledAt,
            Instant noshowAt,
            Instant cancelScheduledAt,
            Instant serverNow,
            long version
    ) {}

    public record CallNextRequest(@NotNull UUID counterId) {}

    public record TicketActionRequest(long version) {}

    public record TransferTicketRequest(
            UUID targetCounterId,
            UUID targetQueueId,
            @Size(max = 255) String reason,
            long version
    ) {}

    public record CreateWalkinRequest(
            @NotBlank @Size(min = 2, max = 30) String displayName,
            @Min(1) int partySize,
            @Size(max = 255) String notes
    ) {}

    public record TicketStaffDto(
            UUID id,
            UUID queueId,
            UUID counterId,
            String counterName,
            String ticketNumber,
            String displayName,
            int partySize,
            String notes,
            boolean isWalkin,
            TicketStatus status,
            int recallCount,
            Instant lastRecalledAt,
            boolean isAcknowledged,
            boolean isRestored,
            Instant createdAt,
            Instant calledAt,
            Instant servingAt,
            Instant noshowAt,
            Instant cancelScheduledAt,
            long version
    ) {}

    public record StaffQueueStateDto(
            UUID queueId,
            String queueName,
            QueueStatus queueStatus,
            TicketStaffDto currentCounterTicket,
            List<TicketStaffDto> waitingList,
            List<TicketStaffDto> noshowList,
            Instant serverNow
    ) {}
}
