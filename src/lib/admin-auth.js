import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "wow_admin_session";
const DEFAULT_TTL_MS = (Number(process.env.ADMIN_SESSION_TTL_DAYS || 7) || 7) * 24 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    console.error("ADMIN_SESSION_SECRET no está configurado");
  }
  return secret;
}

export function validateAdminCredentials(username, password) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    console.error("ADMIN_USER o ADMIN_PASSWORD no están configurados");
    return false;
  }

  return username === expectedUser && password === expectedPassword;
}

function signPayload(payload) {
  const secret = getSecret();
  if (!secret) return null;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(username) {
  const issuedAt = Date.now();
  const payload = `${username}|${issuedAt}`;
  const signature = signPayload(payload);
  if (!signature) return null;

  return Buffer.from(`${payload}|${signature}`).toString("base64url");
}

export function parseSessionToken(token) {
  if (!token) return null;
  const decoded = Buffer.from(token, "base64url").toString("utf-8");
  const [username, issuedAt, signature] = decoded.split("|");
  if (!username || !issuedAt || !signature) return null;

  const expectedSignature = signPayload(`${username}|${issuedAt}`);
  if (!expectedSignature || expectedSignature !== signature) return null;

  if (Date.now() - Number(issuedAt) > DEFAULT_TTL_MS) {
    return null;
  }

  return { username };
}

export function setSessionCookie(username) {
  const token = createSessionToken(username);
  if (!token) return null;

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: Math.floor(DEFAULT_TTL_MS / 1000),
  });

  return token;
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}

export function getSessionFromCookies() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return parseSessionToken(token);
}

export { SESSION_COOKIE };
