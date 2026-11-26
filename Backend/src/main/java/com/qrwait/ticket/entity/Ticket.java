package com.qrwait.ticket.entity;

import com.qrwait.iam.entity.User;
import com.qrwait.queue.entity.Counter;
import com.qrwait.queue.entity.Queue;
import com.qrwait.queue.entity.QueueSession;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "queue_id", nullable = false)
    private Queue queue;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "session_id", nullable = false)
    private QueueSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counter_id")
    private Counter counter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private User staff;

    @Column(name = "ticket_number", nullable = false, length = 20)
    private String ticketNumber;

    @Column(name = "sequence_number", nullable = false)
    private int sequenceNumber;

    @Column(name = "display_name", nullable = false, length = 50)
    private String displayName;

    @Column(length = 255)
    private String notes;

    @Column(name = "party_size", nullable = false)
    private int partySize;

    @Column(name = "is_walkin", nullable = false)
    private boolean isWalkin = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TicketStatus status = TicketStatus.WAITING;

    @Column(name = "device_token", length = 64)
    private String deviceToken;

    @Column(name = "recall_count", nullable = false)
    private int recallCount = 0;

    @Column(name = "last_recalled_at")
    private Instant lastRecalledAt;

    @Column(name = "is_acknowledged", nullable = false)
    private boolean isAcknowledged = false;

    @Column(name = "is_restored", nullable = false)
    private boolean isRestored = false;

    @Version
    @Column(nullable = false)
    private long version = 0L;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "called_at")
    private Instant calledAt;

    @Column(name = "serving_at")
    private Instant servingAt;

    @Column(name = "completed_at")
    private Instant completedAt;

    @Column(name = "noshow_at")
    private Instant noshowAt;

    @Column(name = "cancel_scheduled_at")
    private Instant cancelScheduledAt;

    @Column(name = "cancelled_at")
    private Instant cancelledAt;

    @Column(name = "cancellation_reason", length = 50)
    private String cancellationReason;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Queue getQueue() { return queue; }
    public void setQueue(Queue queue) { this.queue = queue; }
    public QueueSession getSession() { return session; }
    public void setSession(QueueSession session) { this.session = session; }
    public Counter getCounter() { return counter; }
    public void setCounter(Counter counter) { this.counter = counter; }
    public User getStaff() { return staff; }
    public void setStaff(User staff) { this.staff = staff; }
    public String getTicketNumber() { return ticketNumber; }
    public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }
    public int getSequenceNumber() { return sequenceNumber; }
    public void setSequenceNumber(int sequenceNumber) { this.sequenceNumber = sequenceNumber; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public int getPartySize() { return partySize; }
    public void setPartySize(int partySize) { this.partySize = partySize; }
    public boolean isWalkin() { return isWalkin; }
    public void setWalkin(boolean walkin) { isWalkin = walkin; }
    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }
    public String getDeviceToken() { return deviceToken; }
    public void setDeviceToken(String deviceToken) { this.deviceToken = deviceToken; }
    public int getRecallCount() { return recallCount; }
    public void setRecallCount(int recallCount) { this.recallCount = recallCount; }
    public Instant getLastRecalledAt() { return lastRecalledAt; }
    public void setLastRecalledAt(Instant lastRecalledAt) { this.lastRecalledAt = lastRecalledAt; }
    public boolean isAcknowledged() { return isAcknowledged; }
    public void setAcknowledged(boolean acknowledged) { isAcknowledged = acknowledged; }
    public boolean isRestored() { return isRestored; }
    public void setRestored(boolean restored) { isRestored = restored; }
    public long getVersion() { return version; }
    public void setVersion(long version) { this.version = version; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getCalledAt() { return calledAt; }
    public void setCalledAt(Instant calledAt) { this.calledAt = calledAt; }
    public Instant getServingAt() { return servingAt; }
    public void setServingAt(Instant servingAt) { this.servingAt = servingAt; }
    public Instant getCompletedAt() { return completedAt; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }
    public Instant getNoshowAt() { return noshowAt; }
    public void setNoshowAt(Instant noshowAt) { this.noshowAt = noshowAt; }
    public Instant getCancelScheduledAt() { return cancelScheduledAt; }
    public void setCancelScheduledAt(Instant cancelScheduledAt) { this.cancelScheduledAt = cancelScheduledAt; }
    public Instant getCancelledAt() { return cancelledAt; }
    public void setCancelledAt(Instant cancelledAt) { this.cancelledAt = cancelledAt; }
    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }
}
