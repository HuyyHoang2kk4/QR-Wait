package com.qrwait.iam.security;

import com.qrwait.iam.entity.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * Thong tin nguoi dung da xac thuc duoc gan vao SecurityContextHolder.
 */
public record UserPrincipal(
        UUID userId,
        UUID organizationId,
        String email,
        UserRole role,
        List<UUID> branchIds
) implements UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return email;
    }
}
