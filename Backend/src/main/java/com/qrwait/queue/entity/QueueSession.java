package com.qrwait.queue.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "queue_sessions")
public class QueueSession {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "queue_id", nullable = false)
    private Queue queue;

    @Column(name = "session_number", nullable = false)
    private int sessionNumber;

    @Column(name = "started_at", nullable = false)
    private Instant startedAt = Instant.now();

    @Column(name = "ended_at")
    private Instant endedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private QueueSessionStatus status = QueueSessionStatus.ACTIVE;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Queue getQueue() { return queue; }
    public void setQueue(Queue queue) { this.queue = queue; }
    public int getSessionNumber() { return sessionNumber; }
    public void setSessionNumber(int sessionNumber) { this.sessionNumber = sessionNumber; }
    public Instant getStartedAt() { return startedAt; }
    public void setStartedAt(Instant startedAt) { this.startedAt = startedAt; }
    public Instant getEndedAt() { return endedAt; }
    public void setEndedAt(Instant endedAt) { this.endedAt = endedAt; }
    public QueueSessionStatus getStatus() { return status; }
    public void setStatus(QueueSessionStatus status) { this.status = status; }
}
