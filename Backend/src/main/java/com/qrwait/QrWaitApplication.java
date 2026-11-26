package com.qrwait;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Entry point cua he thong QR-Wait (Modular Monolith: M1 - M10).
 * Module M11 (Open API & Webhooks) tam dung theo pham vi BRD v1.3 / SRS v1.2.
 */
@SpringBootApplication
@EnableCaching
@EnableScheduling
public class QrWaitApplication {

    public static void main(String[] args) {
        SpringApplication.run(QrWaitApplication.class, args);
    }
}
