import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

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
