// A simple in-memory store for rate limiting
// In production, you'd use Redis or another distributed store
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limiting function to prevent brute force attacks
 * Limits login attempts to 5 per email address in a 15-minute window
 */
export async function rateLimit(email: string): Promise<RateLimitResult> {
  const MAX_ATTEMPTS = 5;
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  
  const now = Date.now();
  const attempt = loginAttempts.get(email) || { count: 0, lastAttempt: now };
  
  // Reset count if window has expired
  if (now - attempt.lastAttempt > WINDOW_MS) {
    attempt.count = 0;
    attempt.lastAttempt = now;
  }
  
  // Increment attempt count
  attempt.count += 1;
  loginAttempts.set(email, attempt);
  
  // Calculate remaining attempts and reset time
  const remaining = Math.max(0, MAX_ATTEMPTS - attempt.count);
  const resetMs = Math.max(0, WINDOW_MS - (now - attempt.lastAttempt));
  const resetSec = Math.ceil(resetMs / 1000);
  
  return {
    success: attempt.count <= MAX_ATTEMPTS,
    limit: MAX_ATTEMPTS,
    remaining,
    reset: resetSec,
  };
} 