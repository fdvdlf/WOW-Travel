import { NextResponse } from "next/server";

import { clearSessionCookie, getSessionFromCookies } from "@/lib/admin-auth";

export async function POST() {
  const session = getSessionFromCookies();
  if (session) {
    clearSessionCookie();
  }

  return NextResponse.json({ ok: true });
}
