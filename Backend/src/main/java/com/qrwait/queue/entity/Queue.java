package com.qrwait.queue.entity;

import com.qrwait.organization.entity.Branch;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "queues")
public class Queue {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 5)
    private String prefix;

    @Column(name = "avg_service_minutes", nullable = false)
    private int avgServiceMinutes = 10;

    @Column(name = "min_party_size", nullable = false)
    private int minPartySize = 1;

    @Column(name = "max_party_size", nullable = false)
    private int maxPartySize = 20;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private QueueStatus status = QueueStatus.OPEN;

    @Column(name = "qr_token", nullable = false, unique = true, length = 64)
    private String qrToken;

    @Column(name = "rotate_qr_on_session", nullable = false)
    private boolean rotateQrOnSession = false;

    @Column(name = "current_sequence", nullable = false)
    private int currentSequence = 0;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Branch getBranch() { return branch; }
    public void setBranch(Branch branch) { this.branch = branch; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPrefix() { return prefix; }
    public void setPrefix(String prefix) { this.prefix = prefix; }
    public int getAvgServiceMinutes() { return avgServiceMinutes; }
    public void setAvgServiceMinutes(int avgServiceMinutes) { this.avgServiceMinutes = avgServiceMinutes; }
    public int getMinPartySize() { return minPartySize; }
    public void setMinPartySize(int minPartySize) { this.minPartySize = minPartySize; }
    public int getMaxPartySize() { return maxPartySize; }
    public void setMaxPartySize(int maxPartySize) { this.maxPartySize = maxPartySize; }
    public QueueStatus getStatus() { return status; }
    public void setStatus(QueueStatus status) { this.status = status; }
    public String getQrToken() { return qrToken; }
    public void setQrToken(String qrToken) { this.qrToken = qrToken; }
    public boolean isRotateQrOnSession() { return rotateQrOnSession; }
    public void setRotateQrOnSession(boolean rotateQrOnSession) { this.rotateQrOnSession = rotateQrOnSession; }
    public int getCurrentSequence() { return currentSequence; }
    public void setCurrentSequence(int currentSequence) { this.currentSequence = currentSequence; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
