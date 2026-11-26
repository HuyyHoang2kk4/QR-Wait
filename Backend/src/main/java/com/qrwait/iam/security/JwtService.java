package com.qrwait.iam.security;

import com.qrwait.iam.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Dich vu sinh va xac thuc JWT Access Token (Detailed Design Muc 2.1 & 3.3).
 */
@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long accessExpirationMs;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.access-expiration-ms}") long accessExpirationMs) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessExpirationMs = accessExpirationMs;
    }

    /**
     * TODO: Sinh JWT Access Token chua claims: sub (userId), orgId, role, branchIds, iat, exp.
     */
    public String generateAccessToken(User user, List<UUID> branchIds) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("orgId", user.getOrganization() != null ? user.getOrganization().getId().toString() : null)
                .claim("role", user.getRole().name())
                .claim("branchIds", branchIds.stream().map(UUID::toString).toList())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(accessExpirationMs)))
                .signWith(secretKey)
                .compact();
    }

    public Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
