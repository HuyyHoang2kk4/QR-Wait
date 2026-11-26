package com.qrwait.organization.repository;

import com.qrwait.organization.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BranchRepository extends JpaRepository<Branch, UUID> {
    List<Branch> findByOrganizationIdAndIsActiveTrue(UUID organizationId);
}
