import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/resale/ontario/")) {
    const city = pathname.split("/")[3];
    return NextResponse.redirect(new URL("/" + city, request.url));
  }

  return NextResponse.next();
}
