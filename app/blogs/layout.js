import Footer from "@/components/Footer";

async function getCities() {
  try {
    const res = await fetch("https://api.condomonk.ca/api/all-city", {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["cities"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cities");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

export default async function BlogLayout({ children }) {
  const cities = await getCities();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <Footer cities={cities} />
    </div>
  );
}
