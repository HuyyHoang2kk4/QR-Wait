package com.qrwait.ticket.entity;

import com.qrwait.iam.entity.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "ticket_audit_logs")
public class TicketAuditLog {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private User staff;

    @Column(name = "from_status", nullable = false, length = 20)
    private String fromStatus;

    @Column(name = "to_status", nullable = false, length = 20)
    private String toStatus;

    @Column(name = "transition_at", nullable = false)
    private Instant transitionAt = Instant.now();

    @Column(length = 255)
    private String note;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }
    public User getStaff() { return staff; }
    public void setStaff(User staff) { this.staff = staff; }
    public String getFromStatus() { return fromStatus; }
    public void setFromStatus(String fromStatus) { this.fromStatus = fromStatus; }
    public String getToStatus() { return toStatus; }
    public void setToStatus(String toStatus) { this.toStatus = toStatus; }
    public Instant getTransitionAt() { return transitionAt; }
    public void setTransitionAt(Instant transitionAt) { this.transitionAt = transitionAt; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
