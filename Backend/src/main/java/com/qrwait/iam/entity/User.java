package com.qrwait.iam.entity;


import com.qrwait.organization.entity.Organization;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @Column(name = "display_name" , nullable = false , length = 100)
    private String displayName;

    @Column(nullable = false , unique = true , length = 100)
    private String email;

    @Column(name = "password_Hasd" , nullable = false , length = 255)
    private String passwordHasd ;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false , length = 30)
    private UserRole role ;

    @Column(name = "is_active" , nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
