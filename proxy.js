import { NextResponse } from "next/server";

// Next.js 16 (in this specific configuration) expects the function
// name to be "proxy" or a default export.
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Logic to handle the Ontario resale paths
  if (pathname.startsWith("/resale/ontario/")) {
    const segments = pathname.split("/");
    const city = segments[3];

    // Using rewrite to act as a true proxy (URL stays the same in browser)
    return NextResponse.rewrite(new URL("/" + city, request.url));
  }

  return NextResponse.next();
}

// Ensure you keep your matcher to avoid running this on every single asset/image
export const config = {
  matcher: "/resale/ontario/:path*",
};
