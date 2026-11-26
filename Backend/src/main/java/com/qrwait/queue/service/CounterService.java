package com.qrwait.queue.service;

import com.qrwait.iam.security.UserPrincipal;
import com.qrwait.queue.dto.QueueDtos.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Module M3: Quan ly Quay phuc vu vat ly va lien ket Hang cho (FR-011).
 */
@Service
public class CounterService {

    @Transactional(readOnly = true)
    public List<CounterDto> listCounters(UserPrincipal actor, UUID branchId) {
        // TODO: Lay danh sach Counter thuoc branchId
        throw new UnsupportedOperationException("TODO: Implement CounterService.listCounters");
    }

    @Transactional
    public CounterDto createCounter(UserPrincipal actor, UUID branchId, UpsertCounterRequest req) {
        // TODO: Tao Counter moi va gan tap Queue tuong ung trong cung branch (FR-011)
        throw new UnsupportedOperationException("TODO: Implement CounterService.createCounter (FR-011)");
    }

    @Transactional
    public CounterDto updateCounter(UserPrincipal actor, UUID counterId, UpsertCounterRequest req) {
        // TODO: Cap nhat ten, trang thai isActive va danh sach queueIds (FR-011)
        throw new UnsupportedOperationException("TODO: Implement CounterService.updateCounter (FR-011)");
    }
}
