// In-memory rate limiter for Vercel serverless.
// Resets on cold starts — sufficient for a portfolio site.
// For high-traffic production use, replace with Upstash Redis.

const store = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(ip) ?? { count: 0, resetTime: now + windowMs }

  if (now > entry.resetTime) {
    entry.count = 0
    entry.resetTime = now + windowMs
  }

  entry.count++
  store.set(ip, entry)

  return entry.count <= limit
}

export function getClientIP(request: Request): string {
  const forwarded = (request.headers as Headers).get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  const realIP = (request.headers as Headers).get("x-real-ip")
  if (realIP) return realIP.trim()
  return "unknown"
}
