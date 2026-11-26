package com.qrwait.common.util;

import java.security.SecureRandom;
import java.util.HexFormat;

/**
 * Sinh token ngau nhien bao mat cho qr_token (32-64 chars) va screen_token (64 chars).
 */
public final class TokenGenerator {

    private static final SecureRandom RANDOM = new SecureRandom();

    private TokenGenerator() {
    }

    public static String nextHexToken(int byteLength) {
        byte[] bytes = new byte[byteLength];
        RANDOM.nextBytes(bytes);
        return HexFormat.of().formatHex(bytes);
    }
}
