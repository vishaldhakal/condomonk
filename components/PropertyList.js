import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";

export default function PropertyList({
  properties,
  total,
  currentPage,
  totalPages,
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {properties.map((property) => (
          <PropertyCard key={property.ListingKey} property={property} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
