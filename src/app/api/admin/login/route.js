import { NextResponse } from "next/server";

import { setSessionCookie, validateAdminCredentials } from "@/lib/admin-auth";

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Payload inválido" }, { status: 400 });
  }

  const { username, password } = payload || {};
  const valid = validateAdminCredentials(username, password);

  if (!valid) {
    return NextResponse.json({ ok: false, message: "Credenciales inválidas" }, { status: 401 });
  }

  const token = setSessionCookie(username);
  if (!token) {
    return NextResponse.json({ ok: false, message: "No se pudo crear la sesión" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
