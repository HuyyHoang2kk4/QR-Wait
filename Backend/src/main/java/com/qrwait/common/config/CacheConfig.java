package com.qrwait.common.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Cau hinh Caffeine In-Memory Cache thay cho Redis rieng (Detailed Design Muc 2.1 & 3.3).
 */
@Configuration
public class CacheConfig {

    public static final String CACHE_JWT_BLACKLIST = "jwtBlacklist";
    public static final String CACHE_LOGIN_ATTEMPTS = "loginAttempts";
    public static final String CACHE_RECALL_COOLDOWN = "recallCooldown";
    public static final String CACHE_QUEUE_SNAPSHOT = "queueSnapshot";

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager manager = new SimpleCacheManager();
        manager.setCaches(List.of(
                buildCache(CACHE_JWT_BLACKLIST, 60, TimeUnit.MINUTES, 5_000),
                buildCache(CACHE_LOGIN_ATTEMPTS, 5, TimeUnit.MINUTES, 5_000),
                buildCache(CACHE_RECALL_COOLDOWN, 20, TimeUnit.SECONDS, 5_000),
                buildCache(CACHE_QUEUE_SNAPSHOT, 10, TimeUnit.SECONDS, 2_000)
        ));
        return manager;
    }

    private CaffeineCache buildCache(String name, long duration, TimeUnit unit, long maxSize) {
        return new CaffeineCache(name, Caffeine.newBuilder()
                .expireAfterWrite(duration, unit)
                .maximumSize(maxSize)
                .build());
    }
}
