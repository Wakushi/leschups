import { User } from "@/types/user.type"
import * as jose from "jose"

export type JWTPayload = {
  id: string
  email: string
  exp: number
  iat: number
  userType: "admin" | "user"
}

type CryptoOptions = {
  jwtSecret: string
  jwtTokenDuration: string
  hashAlgo: string
  saltLen: number
}

const CRYPTO_CONFIG: CryptoOptions = {
  jwtSecret: process.env.JWT_SECRET ?? "",
  jwtTokenDuration: process.env.JWT_TOKEN_DURATION ?? "",
  hashAlgo: "whirlpool",
  saltLen: 10,
}

async function createUserJwtToken(
  payload: User,
  expiresIn = CRYPTO_CONFIG.jwtTokenDuration,
  jwtSecret = CRYPTO_CONFIG.jwtSecret
): Promise<string> {
  const secret = new TextEncoder().encode(jwtSecret)
  const alg = "HS256"

  return new jose.SignJWT({
    id: payload.id,
    email: payload.email,
    userType: payload.role,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime(expiresIn)
    .sign(secret)
}

async function verifyJWT(token: string): Promise<JWTPayload> {
  const secret = new TextEncoder().encode(CRYPTO_CONFIG.jwtSecret)
  const { payload } = await jose.jwtVerify(token, secret)
  return payload as JWTPayload
}

export { createUserJwtToken, verifyJWT }
