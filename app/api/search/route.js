export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("term");

  if (!searchTerm || searchTerm.length < 2) {
    return Response.json({ value: [] });
  }

  // Check if environment variables are defined
  if (
    !process.env.NEXT_PUBLIC_BASE_URL ||
    !process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API
  ) {
    console.error("Missing required environment variables");
    return Response.json(
      { value: [], error: "Configuration error" },
      { status: 500 }
    );
  }

  // Ensure base URL is properly formatted
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "").replace(
    /\/$/,
    ""
  );

  // Use the exact API format you provided
  const url = `${baseUrl}/Property?$filter=contains(UnparsedAddress,'${searchTerm}')&$select=UnparsedAddress,StreetName,City,ListPrice&$top=5`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API.startsWith(
          "Bearer "
        )
          ? process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API
          : `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`API responded with status ${response.status}`);
      console.error("Response headers:", Object.fromEntries(response.headers));
      const errorText = await response.text();
      console.error("Error response:", errorText);

      return Response.json(
        { value: [], error: `API request failed: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Property search error:", error.message);
    return Response.json(
      { value: [], error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
