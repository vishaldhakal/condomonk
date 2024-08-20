// app/api/track/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const trackingData = await request.json();

  // Forward the data to your Django backend
  const response = await fetch("https://api.condomonk.ca/api/track/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trackingData),
  });

  if (response.ok) {
    return NextResponse.json(
      { message: "Tracking data received" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Failed to process tracking data" },
      { status: 500 }
    );
  }
}
