export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("term");

  if (!searchTerm || searchTerm.length < 2) {
    return Response.json({ value: [] });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");
  const url = `${baseUrl}Property?$filter=contains(UnparsedAddress,'${searchTerm}')&$select=UnparsedAddress,StreetName,City,ListPrice,ListingKey&$top=5`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Property search error:", error);
    return Response.json(
      { value: [], error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
