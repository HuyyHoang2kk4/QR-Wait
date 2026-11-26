package com.qrwait.display.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public final class TvDisplayDtos {

    private TvDisplayDtos() {
    }

    public record ScreenTokenDto(String token, String displayUrl) {}

    public record TvServingCardDto(
            UUID counterId,
            String counterName,
            UUID ticketId,
            String ticketNumber,
            String displayName,
            int partySize,
            String status,
            int recallCount,
            Instant calledAt
    ) {}

    public record TvQueueQrDto(
            UUID queueId,
            String queueName,
            String prefix,
            String qrToken,
            String checkinUrl
    ) {}

    public record TvDisplayBootstrapDto(
            UUID branchId,
            String branchName,
            String organizationName,
            String logoUrl,
            boolean ttsEnabled,
            long totalWaiting,
            List<TvServingCardDto> servingCards,
            List<TvServingCardDto> recentCalled,
            List<TvQueueQrDto> queuesQr,
            Instant serverNow
    ) {}
}
