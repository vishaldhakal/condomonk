import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const url = request.nextUrl.clone();

  // Check if the URL starts with /new-homes/
  if (url.pathname.startsWith("/new-homes/")) {
    // Extract the city name from the URL by removing /new-homes/
    const city = url.pathname.replace("/new-homes/", "");

    // Create the new URL with just the city name
    const newUrl = new URL(`/${city}`, url.origin);

    // Return redirect response
    return NextResponse.redirect(newUrl);
  }
}

// Configure which paths the middleware will run on
export const config = {
  matcher: "/new-homes/:path*",
};
