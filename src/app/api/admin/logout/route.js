import { NextResponse } from "next/server";

import { clearSessionCookie, getSessionFromCookies } from "@/lib/admin-auth";

export async function POST() {
  const session = await getSessionFromCookies();
  if (session) {
    await clearSessionCookie();
  }

  return NextResponse.json({ ok: true });
}
