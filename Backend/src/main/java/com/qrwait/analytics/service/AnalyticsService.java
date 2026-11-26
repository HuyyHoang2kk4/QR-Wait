package com.qrwait.analytics.service;

import com.qrwait.analytics.dto.AnalyticsDtos.AnalyticsOverviewDto;
import com.qrwait.iam.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.OutputStream;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Module M10: Bao cao thong ke van hanh & Stream xuat CSV chuan UTF-8 BOM (FR-039, FR-040, NFR-010).
 */
@Service
public class AnalyticsService {

    /**
     * Tong hop chi so KPI, bieu do theo gio & bang nang suat nhan vien (FR-039).
     */
    @Transactional(readOnly = true)
    public AnalyticsOverviewDto getOverview(
            UserPrincipal actor, UUID branchId, UUID queueId, LocalDate fromDate, LocalDate toDate) {
        // TODO: Kiem tra quyen chi nhanh, khoang ngay <= 90 ngay & truy van SQL tong hop
        throw new UnsupportedOperationException("TODO: Implement AnalyticsService.getOverview (FR-039)");
    }

    /**
     * Stream xuat toi da 50.000 dong CSV ma hoa UTF-8 BOM khong tran RAM (FR-040, NFR-010).
     *
     * <p>Thu tu cot bat buoc:
     * ticket_number, queue_name, display_name, party_size, notes, is_walkin,
     * counter_name, staff_name, status, created_at, called_at, serving_at,
     * completed_at, noshow_at, wait_duration_seconds, service_duration_seconds.
     */
    @Transactional(readOnly = true)
    public void streamCsvExport(
            UserPrincipal actor, UUID branchId, UUID queueId, LocalDate fromDate, LocalDate toDate, OutputStream out) {
        // TODO: Ghi 3 byte BOM (0xEF, 0xBB, 0xBF), phan trang/stream tung lo 500 dong va detach Entity
        throw new UnsupportedOperationException("TODO: Implement AnalyticsService.streamCsvExport (FR-040)");
    }
}
