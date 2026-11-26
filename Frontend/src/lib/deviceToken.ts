const DEVICE_TOKEN_KEY = 'qrwait_device_token';

/**
 * Lay hoac sinh moi Device Token (UUID v4) luu trong LocalStorage (BRL-009, Zero-PII).
 */
export function getOrCreateDeviceToken(): string {
  let token = localStorage.getItem(DEVICE_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(DEVICE_TOKEN_KEY, token);
  }
  return token;
}
