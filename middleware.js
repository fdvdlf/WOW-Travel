import { NextResponse } from "next/server";

import { SESSION_COOKIE, parseSessionToken } from "@/lib/admin-auth";

const PUBLIC_API_ROUTES = ["/api/admin/login"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (PUBLIC_API_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await parseSessionToken(token);

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!session && (isAdminApi || isAdminPage)) {
    if (isAdminApi) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    if (pathname) {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
