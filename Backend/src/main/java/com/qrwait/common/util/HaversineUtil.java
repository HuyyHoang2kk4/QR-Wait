package com.qrwait.common.util;

/**
 * Tien ich tinh khoang cach dia ly giua thiet bi khach hang va chi nhanh (BRL-002).
 */
public final class HaversineUtil {

    private static final double EARTH_RADIUS_METERS = 6_371_000.0;

    private HaversineUtil() {
    }

    /**
     * Tinh khoang cach duong chim bay (don vi: met) theo cong thuc Haversine.
     */
    public static double distanceMeters(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.asin(Math.sqrt(a));
        return EARTH_RADIUS_METERS * c;
    }
}
