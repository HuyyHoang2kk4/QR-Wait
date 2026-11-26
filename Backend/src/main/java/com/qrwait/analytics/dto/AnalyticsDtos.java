package com.qrwait.analytics.dto;

import java.util.List;
import java.util.UUID;

public final class AnalyticsDtos {

    private AnalyticsDtos() {
    }

    public record HourlyTrafficPoint(int hour, long ticketCount) {}

    public record StaffProductivityRow(UUID staffId, String staffName, long servedCount, double avgServiceMinutes) {}

    public record AnalyticsOverviewDto(
            long totalTickets,
            long completedCount,
            long cancelledCount,
            long noshowTimeoutCount,
            double completionRatePercent,
            double noshowRatePercent,
            double avgWaitMinutes,
            double avgServiceMinutes,
            List<HourlyTrafficPoint> hourlyTraffic,
            List<StaffProductivityRow> staffRanking
    ) {}
}
