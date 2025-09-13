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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {properties.map((property, index) => (
          <PropertyCard
            key={property.ListingKey}
            property={property}
            index={index}
          />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
