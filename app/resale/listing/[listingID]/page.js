import { getListingDetail } from "@/lib/properties";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import PropertyGallery from "@/components/PropertyGallery";
import Link from "next/link";
import HomeOverview from "@/components/HomeOverview";
import CompactMortgageCalculator from "@/components/CompactMortgageCalculator";

export default async function PropertyDetailPage({ params }) {
  try {
    const property = await getListingDetail(params.listingID);

    if (!property) {
      notFound();
    }

    const totalBathrooms =
      (property.WashroomsType1Pcs || 0) + (property.WashroomsType2Pcs || 0);

    return (
      <div className="max-w-[1370px] mx-auto px-4 pt-6">
        {/* Header with Breadcrumb and Share/Save */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/resale"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-500"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/resale/ontario"
              className="text-gray-500 hover:text-gray-700"
            >
              Ontario
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/resale/ontario/${property.City.toLowerCase()}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {property.City}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">
              {property.StreetNumber} {property.StreetName}{" "}
              {property.StreetSuffix}
            </span>
          </nav>

          {/* Share/Save Buttons */}
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Save
            </button>
          </div>
        </div>

        {/* Property Gallery */}
        <PropertyGallery images={property.images} />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Property Header */}
            <div className="pb-8">
              {/* Status and Type */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  <span className="text-base text-gray-600">
                    House for sale
                  </span>
                </span>
              </div>

              {/* Price */}
              <h1 className="text-4xl font-bold mb-2">
                ${property.ListPrice.toLocaleString()}
              </h1>

              <div className=" pb-2">
                <div className="">MLS - #{property.ListingKey}</div>
              </div>

              {/* Key Details */}
              <div className="flex items-center gap-4 text-base mb-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold">{property.BedroomsTotal}</span>
                  <span className="text-gray-600">bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{totalBathrooms}</span>
                  <span className="text-gray-600">bath</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">
                    {property.BuildingAreaTotal || "1,484"}
                  </span>
                  <span className="text-gray-600">sqft</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">
                    {property.LotSize ||
                      `${property.LotWidth} x ${property.LotDepth}`}
                  </span>
                  <span className="text-gray-600">sqft lot</span>
                </div>
              </div>

              {/* Address */}
              <p className="text-lg text-gray-700 mb-2">
                {property.StreetNumber} {property.StreetName}{" "}
                {property.StreetSuffix}, {property.City},{" "}
                {property.StateOrProvince} {property.PostalCode}
              </p>

              {/* Additional Info */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {/* Property Type */}
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <div>
                    <span className="font-medium">
                      {property.PropertyType || "Single family"}
                    </span>
                  </div>
                </div>

                {/* Days on Market */}
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <span className="font-medium">6</span>
                    <span className="text-gray-500 ml-1">Days on MLS</span>
                  </div>
                </div>

                {/* Garage */}
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h18v18H3z M3 12h18"
                    />
                  </svg>
                  <div>
                    <span className="font-medium">2 Cars</span>
                  </div>
                </div>

                {/* Year Built */}
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                    />
                  </svg>
                  <div>
                    <span className="font-medium">
                      Built in {property.YearBuilt || "2014"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold mb-4">About this property</h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {property.PublicRemarks}
              </p>
            </div>

            <HomeOverview property={property} />
            <div className="mt-0 text-sm">
              Listed by {property.ListOfficeName}
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold mb-4 pt-8">
                Property Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {property.InteriorFeatures?.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 text-xl">
                      Interior Features
                    </h3>
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
                    <h3 className="font-bold mb-2 text-xl">
                      Exterior Features
                    </h3>
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
            <div className="pt-3">
              <h2 className="text-3xl font-bold mb-4">Additional Details</h2>
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

            <div className="mt-12 col-12 md:pt-24 md:col-12">
              <CompactMortgageCalculator
                price={property?.ListPrice}
                showDetails={false}
                align="left"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6  top-6">
            {/* Booking Form */}
            <div className="bg-white p-6 rounded-lg sticky top-6">
              <BookingForm
                propertyId={property.ListingKey}
                address={`${property.StreetNumber} ${property.StreetName}`}
                price={property.ListPrice}
                transactionType={property.TransactionType}
              />
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
