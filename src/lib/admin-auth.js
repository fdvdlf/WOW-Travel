const SESSION_COOKIE = "wow_admin_session";
const DEFAULT_TTL_MS = (Number(process.env.ADMIN_SESSION_TTL_DAYS || 7) || 7) * 24 * 60 * 60 * 1000;
const textEncoder = new TextEncoder();
const isProduction = process.env.NODE_ENV === "production";

function encodeBase64Url(value) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf-8").toString("base64url");
  }

  const base64 = btoa(value);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64url").toString("utf-8");
  }

  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(normalized);
}

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

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function signPayload(payload) {
  const secret = getSecret();
  if (!secret) return null;

  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(payload));
  return toHex(signature);
}

export async function createSessionToken(username) {
  const issuedAt = Date.now();
  const payload = `${username}|${issuedAt}`;
  const signature = await signPayload(payload);
  if (!signature) return null;

  return encodeBase64Url(`${payload}|${signature}`);
}

export async function parseSessionToken(token) {
  if (!token) return null;
  const decoded = decodeBase64Url(token);
  const [username, issuedAt, signature] = decoded.split("|");
  if (!username || !issuedAt || !signature) return null;

  const expectedSignature = await signPayload(`${username}|${issuedAt}`);
  if (!expectedSignature || expectedSignature !== signature) return null;

  if (Date.now() - Number(issuedAt) > DEFAULT_TTL_MS) {
    return null;
  }

  return { username };
}

export async function setSessionCookie(username) {
  const token = await createSessionToken(username);
  if (!token) return null;

  const { cookies } = await import("next/headers");

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: Math.floor(DEFAULT_TTL_MS / 1000),
  });

  return token;
}

export async function clearSessionCookie() {
  const { cookies } = await import("next/headers");
  cookies().delete(SESSION_COOKIE);
}

export async function getSessionFromCookies() {
  const { cookies } = await import("next/headers");
  const token = cookies().get(SESSION_COOKIE)?.value;
  return parseSessionToken(token);
}

export { SESSION_COOKIE };
