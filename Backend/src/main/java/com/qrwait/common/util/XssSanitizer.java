package com.qrwait.common.util;

/**
 * Loai bo the HTML/script khoi display_name va notes cua khach hang de chong XSS (SRS 13.1).
 */
public final class XssSanitizer {

    private XssSanitizer() {
    }

    public static String sanitize(String input) {
        if (input == null) {
            return null;
        }
        return input.replaceAll("<[^>]*>", "").trim();
    }
}
