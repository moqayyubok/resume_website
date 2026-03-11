import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// If JWT_SECRET is not set, all auth attempts fail — no insecure default.
const JWT_SECRET = process.env.JWT_SECRET ?? ""

// If admin credentials aren't configured, fall back to a never-matchable hash.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ""
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ?? bcrypt.hashSync(crypto.randomUUID(), 10)

export interface User {
  email: string
  role: "admin"
}

export async function verifyPassword(password: string): Promise<boolean> {
  if (!ADMIN_EMAIL) return false
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}

export function generateToken(user: User): string {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured")
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): User | null {
  if (!JWT_SECRET) return null
  try {
    return jwt.verify(token, JWT_SECRET) as User
  } catch {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}

export function requireAuth(request: NextRequest): User | null {
  if (!JWT_SECRET) return null
  const token = getTokenFromRequest(request)
  if (!token) return null
  return verifyToken(token)
}

export { ADMIN_EMAIL }
