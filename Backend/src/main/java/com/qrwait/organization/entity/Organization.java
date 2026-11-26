package com.qrwait.iam.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "organizations")
@Getter
@Setter
@NoArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false , length = 100)
    private String name;

    @Column(name = "logo_url" , length = 500)
    private String logoUrl ;

    @Column(nullable = false , length = 50)
    private String timezone = "Asia /Ho_Chi_Minh" ;

    @Column(name = "is_active" , nullable = false)
    private boolean active = true ;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

}
