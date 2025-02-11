import { getListingDetail } from "@/lib/properties";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import PropertyGallery from "@/components/PropertyGallery";

export default async function PropertyDetailPage({ params }) {
  try {
    const property = await getListingDetail(params.listingID);

    if (!property) {
      notFound();
    }

    const totalBathrooms =
      (property.WashroomsType1Pcs || 0) + (property.WashroomsType2Pcs || 0);

    return (
      <div className="max-w-[1370px] mx-auto px-4 py-6">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {property.StreetNumber} {property.StreetName}{" "}
                {property.StreetSuffix}
              </h1>
              <div className="text-lg text-gray-600">
                {property.City}, {property.StateOrProvince}{" "}
                {property.PostalCode}
              </div>
              <div className="text-2xl font-bold text-primary mt-2">
                ${property.ListPrice.toLocaleString()}
                {property.TransactionType === "For Lease" && (
                  <span className="text-base text-gray-600">/month</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Share
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Property Gallery */}
        <PropertyGallery images={property.images} />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick Facts */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
              <div>
                <div className="text-gray-600 text-sm">Bedrooms</div>
                <div className="font-bold text-lg">
                  {property.BedroomsTotal}
                </div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Bathrooms</div>
                <div className="font-bold text-lg">{totalBathrooms}</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Property Type</div>
                <div className="font-bold text-lg">
                  {property.PropertySubType}
                </div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Lot Size</div>
                <div className="font-bold text-lg">
                  {property.LotWidth} x {property.LotDepth} ft
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About this property</h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {property.PublicRemarks}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Property Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {property.InteriorFeatures?.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2">Interior Features</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {property.InteriorFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {property.ExteriorFeatures?.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2">Exterior Features</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {property.ExteriorFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Additional Details</h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {property.Basement && (
                  <div>
                    <div className="text-gray-600">Basement</div>
                    <div className="font-semibold">
                      {property.Basement.join(", ")}
                    </div>
                  </div>
                )}
                {property.Cooling && (
                  <div>
                    <div className="text-gray-600">Cooling</div>
                    <div className="font-semibold">
                      {property.Cooling.join(", ")}
                    </div>
                  </div>
                )}
                {property.HeatType && (
                  <div>
                    <div className="text-gray-600">Heating</div>
                    <div className="font-semibold">{property.HeatType}</div>
                  </div>
                )}
                {property.ParkingFeatures && (
                  <div>
                    <div className="text-gray-600">Parking Features</div>
                    <div className="font-semibold">
                      {property.ParkingFeatures.join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-6">
              <BookingForm
                propertyId={property.ListingKey}
                address={`${property.StreetNumber} ${property.StreetName}`}
                price={property.ListPrice}
                transactionType={property.TransactionType}
              />
            </div>

            {/* Listed By */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Listed By</h3>
              <div className="space-y-2">
                <div className="text-gray-600">Brokerage</div>
                <div className="font-bold">{property.ListOfficeName}</div>
                <div className="text-gray-600 mt-4">MLS® Number</div>
                <div className="font-bold">{property.ListingKey}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PropertyDetailPage:", error);
    notFound();
  }
}
