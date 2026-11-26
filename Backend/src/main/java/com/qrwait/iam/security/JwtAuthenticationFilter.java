package com.qrwait.iam.security;

import com.qrwait.common.config.CacheConfig;
import com.qrwait.iam.entity.UserRole;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Filter xac thuc Bearer JWT va kiem tra Caffeine jwtBlacklist (FR-004).
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CacheManager cacheManager;

    public JwtAuthenticationFilter(JwtService jwtService, CacheManager cacheManager) {
        this.jwtService = jwtService;
        this.cacheManager = cacheManager;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                Claims claims = jwtService.parseClaims(token);
                UUID userId = UUID.fromString(claims.getSubject());

                // Kiem tra tai khoan da bi thu hoi quyen trong jwtBlacklist (FR-004)
                Cache blacklist = cacheManager.getCache(CacheConfig.CACHE_JWT_BLACKLIST);
                Long revokedAtMs = blacklist != null ? blacklist.get(userId.toString(), Long.class) : null;
                if (revokedAtMs == null || claims.getIssuedAt().getTime() > revokedAtMs) {
                    String orgRaw = claims.get("orgId", String.class);
                    UUID orgId = orgRaw != null ? UUID.fromString(orgRaw) : null;
                    UserRole role = UserRole.valueOf(claims.get("role", String.class));
                    List<?> rawBranches = claims.get("branchIds", List.class);
                    List<UUID> branchIds = rawBranches == null
                            ? List.of()
                            : rawBranches.stream().map(Object::toString).map(UUID::fromString).toList();

                    UserPrincipal principal = new UserPrincipal(
                            userId, orgId, claims.get("email", String.class), role, branchIds);
                    var auth = new UsernamePasswordAuthenticationToken(
                            principal, null, principal.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception ignored) {
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);
    }
}
