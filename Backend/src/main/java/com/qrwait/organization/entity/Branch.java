package com.qrwait.organization.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "branches")
public class Branch {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column(name = "is_geo_enabled", nullable = false)
    private boolean isGeoEnabled = false;

    @Column(name = "gps_radius_meters", nullable = false)
    private int gpsRadiusMeters = 100;

    @Column(name = "tts_enabled", nullable = false)
    private boolean ttsEnabled = true;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Organization getOrganization() { return organization; }
    public void setOrganization(Organization organization) { this.organization = organization; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public boolean isGeoEnabled() { return isGeoEnabled; }
    public void setGeoEnabled(boolean geoEnabled) { isGeoEnabled = geoEnabled; }
    public int getGpsRadiusMeters() { return gpsRadiusMeters; }
    public void setGpsRadiusMeters(int gpsRadiusMeters) { this.gpsRadiusMeters = gpsRadiusMeters; }
    public boolean isTtsEnabled() { return ttsEnabled; }
    public void setTtsEnabled(boolean ttsEnabled) { this.ttsEnabled = ttsEnabled; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
