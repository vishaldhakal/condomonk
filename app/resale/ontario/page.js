import OntarioCitiesGrid from "@/components/OntarioCitiesGrid";

export const metadata = {
  title: "Discover Ontario Real Estate Listings by City | Condomonk",
  description:
    "Find your perfect property across Ontario's urban centers. Search single-family homes, condominiums, townhouses, and multi-unit properties in major Ontario cities. Ideal for buyers and investors exploring Ontario's dynamic housing market.",
  keywords:
    "Ontario property search, real estate listings Ontario, city-based home listings, Ontario housing market, Condomonk properties, Ontario real estate agents, condos for sale Ontario",
};
const page = async () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <OntarioCitiesGrid />
      </div>
    </div>
  );
};

export default page;
