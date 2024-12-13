import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (request.nextUrl.pathname === "/login" && token) {
    if (role === "manager") {
      return NextResponse.redirect(
        new URL("/admin/persetujuan-data", request.url)
      );
    }
    if (role === "data_entry") {
      return NextResponse.redirect(new URL("/data-entry", request.url));
    }
    if (role === "user_kementrian") {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  if (!token) {
    if (!request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role !== "manager") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/data-entry") &&
    role !== "data_entry"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/user") &&
    role !== "user_kementrian"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
