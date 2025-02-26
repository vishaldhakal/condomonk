import { getListingDetail, getSimilarListings } from "@/lib/properties";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import PropertyGallery from "@/components/PropertyGallery";
import Link from "next/link";
import HomeOverview from "@/components/HomeOverview";
import CompactMortgageCalculator from "@/components/CompactMortgageCalculator";
import FloatingResaleButton from "@/components/FloatingResaleButton";
import {
  getListingAnalytics,
  getCommercialAnalytics,
  getLeaseAnalytics,
} from "@/lib/analytics";
import MarketComparisonChart from "@/components/MarketComparisonChart";
import { formatPrice } from "@/utils/formatting";
import TimeAgo from "@/helper/timeAgo";
import WalkScore from "@/components/WalkScore";
import SimilarHomes from "@/components/SimilarHomes";
import PriceHistory from "@/components/PriceHistory";
import ResaleFAQ from "@/components/ResaleFAQ";
import GoogleMap from "@/components/GoogleMap";

export const revalidate = 60; // 1 minute

export async function generateMetadata({ params }) {
  try {
    const property = await getListingDetail(params.listingID);

    if (!property) {
      return {
        title: "Property Not Found | Condomonk",
        description: "The requested property listing could not be found.",
      };
    }

    const title = `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix} in ${property.City} MLS # ${property.ListingKey} - Condomonk`;

    const description = `Book a showing for ${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix} with MLS # ${property.ListingKey} in ${property.City} with us - Condomonk`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: property.images?.[0] ? [property.images[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: "Resale Homes for Sale | Condomonk",
      description:
        "View detailed information about this property listing on Condomonk.",
    };
  }
}

export default async function PropertyDetailPage({ params }) {
  try {
    const property = await getListingDetail(params.listingID);

    if (!property) {
      notFound();
    }

    // Fetch similar properties
    const similarProperties = await getSimilarListings({ property });

    // Determine which analytics to fetch based on property type and transaction type
    let analyticsData = null;

    if (property.PropertyType === "Commercial") {
      analyticsData = await getCommercialAnalytics({
        listing: property,
        city: property.City,
      });
    } else if (property.TransactionType === "For Lease") {
      analyticsData = await getLeaseAnalytics({
        listing: property,
        city: property.City,
      });
    } else {
      analyticsData = await getListingAnalytics({
        listing: property,
        city: property.City,
      });
    }

    const totalBathrooms =
      (property.WashroomsType1Pcs || 0) + (property.WashroomsType2Pcs || 0);

    // Helper function to get available virtual tour URLs
    const getVirtualTourUrls = (property) => {
      const tours = [];
      if (property.VirtualTourURLBranded) {
        tours.push({ url: property.VirtualTourURLBranded, type: "branded" });
      }
      if (property.VirtualTourURLBranded2) {
        tours.push({ url: property.VirtualTourURLBranded2, type: "branded" });
      }
      if (property.VirtualTourURLUnbranded) {
        tours.push({
          url: property.VirtualTourURLUnbranded,
          type: "unbranded",
        });
      }
      if (property.VirtualTourURLUnbranded2) {
        tours.push({
          url: property.VirtualTourURLUnbranded2,
          type: "unbranded",
        });
      }
      return tours;
    };

    const virtualTours = getVirtualTourUrls(property);

    const priceHistory = [
      {
        price: property.ListPrice,
        date: property.ModificationTimestamp || property.OriginalEntryTimestamp,
      },
    ];

    if (
      property.OriginalListPrice &&
      property.OriginalListPrice !== property.ListPrice
    ) {
      priceHistory.push({
        price: property.OriginalListPrice,
        date: property.OriginalEntryTimestamp,
      });
    }

    return (
      <div className="max-w-[1370px] mx-auto px-4 md:pt-6">
        {/* Header with Breadcrumb and Share/Save */}
        <div className="flex justify-between items-center mb-0 sticky top-0 bg-white ">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 md:text-sm text-[13px]">
            <Link
              href="/resale"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 hidden md:flex"
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
              <span className="hidden md:block">Back</span>
            </Link>
            <span className="text-gray-400 hidden md:block">/</span>
            <Link
              href={`/resale/ontario/homes-${property.TransactionType.toLowerCase().replace(
                / /g,
                "-"
              )}`}
              className="text-gray-500 hover:text-gray-700"
            >
              Ontario
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/resale/ontario/${property.City.toLowerCase().replace(
                / /g,
                "-"
              )}/homes-${property.TransactionType.toLowerCase().replace(
                / /g,
                "-"
              )}`}
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
          <div className="flex md:gap-2 gap-0 ">
            <button className="inline-flex md:items-center items-start gap-2 md:px-4 px-2 py-2 text-gray-600 hover:text-gray-900 md:text-xs text-[10px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              <span className="hidden md:block">Share</span>
            </button>
            <button className="inline-flex items-center gap-2 md:px-4 px-2 py-2 text-gray-600 hover:text-gray-900 md:text-xs text-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span className="hidden md:block">Save</span>
            </button>
          </div>
        </div>

        {/* Property Gallery */}
        <PropertyGallery images={property.images} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8  md:pe-4">
            {/* Property Header */}
            <div className="pb-0">
              {/* Status and Type */}
              <div className="flex flex-col items-start gap-2 mb-2 ">
                {property.OriginalEntryTimestamp && (
                  <span className="inline-flex items-center gap-1 text-black py-0.5 rounded-full text-xs py-1 px-3 bg-yellow-400 shadow-xl mt-4 mt-md-0">
                    <TimeAgo timestamp={property.OriginalEntryTimestamp} />
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  <span className="text-base">
                    {property.PropertySubType} {property.TransactionType}
                  </span>
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl md:text-6xl font-bold">
                    ${property.ListPrice.toLocaleString()}
                  </h2>
                  {property.OriginalListPrice &&
                    property.ListPrice < property.OriginalListPrice && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Price Reduced
                        <span className="ml-1 font-bold">
                          {(
                            ((property.ListPrice - property.OriginalListPrice) /
                              property.OriginalListPrice) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </span>
                    )}
                </div>

                {property.PriceChangeTimestamp && (
                  <p className="text-sm text-gray-500 mt-1">
                    Last price change{" "}
                    <TimeAgo timestamp={property.PriceChangeTimestamp} />
                  </p>
                )}

                <div className="mt-4 flex items-center gap-4">
                  <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    Set Price Alert
                  </button>

                  <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    View Price Trends
                  </button>
                </div>
              </div>

              {/* Key Details */}
              <div className="flex items-center gap-4 text-base mb-0">
                <div className="flex items-center gap-1">
                  <img
                    src="/bedrooms.svg"
                    className="w-3 mr-[2px] inline"
                    alt="bedrooms"
                  />
                  <span className="font-bold">{property.BedroomsTotal}</span>
                  <span>bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/bathrooms.svg"
                    className="w-3 mr-[2px] inline"
                    alt="washrooms"
                  />
                  <span className="font-bold">{totalBathrooms}</span>
                  <span>bath</span>
                </div>
                {property.LotSize && (
                  <div className="flex items-center gap-1">
                    <img
                      src="/ruler.svg"
                      className="w-3 mr-[2px] inline"
                      alt="area"
                    />
                    <span className="font-bold">{property.LotSize}</span>
                    <span>sqft lot</span>
                  </div>
                )}

                <div>
                  <div>MLS - #{property.ListingKey}</div>
                </div>
              </div>

              {/* Address */}
              <h1 className="text-lg md:text-xl mb-2">
                {property.StreetNumber} {property.StreetName}{" "}
                {property.StreetSuffix}, {property.City},{" "}
                {property.StateOrProvince} {property.PostalCode}
              </h1>
            </div>
            {virtualTours.length > 0 && (
              <div className="max-w-5xl mx-auto mb-8 pt-2">
                <div className="bg-white rounded-lg ">
                  <div className="flex items-center gap-3 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" />
                      <path d="M19 12v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5" />
                      <rect x="6" y="9" width="12" height="6" rx="2" />
                    </svg>
                    <h3 className="text-lg font-medium ">Virtual Tours</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3/4 gap-2 ">
                    {virtualTours.map((tour, index) => (
                      <div key={index} className="group">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-1">
                          <iframe
                            src={tour.url}
                            className="w-full h-64"
                            allowFullScreen
                            loading="lazy"
                            title={`Virtual Tour ${index + 1}`}
                          />
                        </div>
                        <a
                          href={tour.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <span className="mr-2">View {tour.type} Tour</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Market Analytics */}
            <div className="bg-white rounded-lg py-6 space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-gray-100 rounded-xl">
                  <div className="text-2xl font-bold black mt-1">
                    {analyticsData?.totalSimilar || 0}
                  </div>
                  <div className="text-sm text-black font-medium">
                    Similar Homes Found
                  </div>
                </div>

                <div className="p-6 bg-gray-100 rounded-xl">
                  <div className="text-2xl font-bold text-black mt-1">
                    ${formatPrice(analyticsData?.avgPrice || 0)}
                  </div>
                  <div className="text-sm text-black font-medium">
                    Average Price
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div
                    className={`text-2xl font-bold mt-1 ${
                      property.ListPrice > (analyticsData?.avgPrice || 0)
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {(
                      ((property.ListPrice - (analyticsData?.avgPrice || 0)) /
                        (analyticsData?.avgPrice || 1)) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-sm text-gray-800 font-medium">
                    {property.ListPrice > (analyticsData?.avgPrice || 0)
                      ? "Higher than average"
                      : "Lower than average"}
                  </div>
                </div>
              </div>

              {/* Market Comparison Chart */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Price Comparison
                </h3>
                <div className="bg-white rounded-lg">
                  <MarketComparisonChart
                    currentPrice={property.ListPrice}
                    comparisons={[
                      {
                        name: `Similar Homes in ${property.City}`,
                        description: `${
                          analyticsData?.totalSimilar
                        } homes with ${property.BedroomsTotal} beds, ${
                          (property.WashroomsType1Pcs || 0) +
                          (property.WashroomsType2Pcs || 0)
                        } baths`,
                        price: analyticsData?.avgPrice || 0,
                      },
                      {
                        name: `${property.BedroomsTotal} Bed Homes`,
                        description: `Average of ${
                          analyticsData?.bedroomCount || 0
                        } homes`,
                        price: analyticsData?.avgPriceBedrooms || 0,
                      },
                      {
                        name: property.PropertySubType,
                        description: `Average of ${
                          analyticsData?.propertyTypeCount || 0
                        } ${property.PropertySubType} homes in ${
                          property.City
                        }`,
                        price: analyticsData?.avgPriceType || 0,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold mb-2">
                About {property.StreetNumber} {property.StreetName}{" "}
                {property.StreetSuffix}
              </h2>
              <p className="text-gray-500 tracking-normal whitespace-pre-wrap leading-7">
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
                    <h3 className="font-medium mb-2 text-lg">
                      Interior Features
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {property.InteriorFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-600 text-[14px]">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {property.ExteriorFeatures?.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2 text-lg">
                      Exterior Features
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {property.ExteriorFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-600 text-[14px]">
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
              <div className="grid grid-cols-2 gap-x-0 gap-y-4">
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
            <div className="pt-16 col-12 md:pt-24 md:col-12">
              <CompactMortgageCalculator
                price={property?.ListPrice}
                showDetails={false}
                align="left"
              />
            </div>

            {/* Similar Homes Section */}
            <div className="">
              <SimilarHomes properties={similarProperties} />
            </div>

            {/* Map Section */}
            <div className="mt-12 z-0">
              <h2 className="text-3xl font-bold mb-4">Location</h2>
              <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200 z-1">
                <GoogleMap
                  width={600}
                  height={400}
                  location={`${property.StreetNumber} ${property.StreetName} ${
                    property.StreetSuffix
                  }, ${property.City.split(" ")[0]}, ${
                    property.StateOrProvince
                  }`}
                  zoom={17}
                />
              </div>
            </div>

            {/* Walk Score Section */}
            <div className="pt-16">
              {/* Title with walking icon */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <img
                    src="/walking.svg"
                    alt="Walking Icon"
                    className="w-8 h-8 mr-2"
                  />
                  <h2 className="text-2xl font-bold">
                    Walk Score for {property.StreetNumber} {property.StreetName}{" "}
                    {property.StreetSuffix}
                  </h2>
                </div>
              </div>

              {/* Walk Score iframe */}
              <div className="walkscore-container rounded-lg overflow-hidden">
                <WalkScore
                  address={`${property.StreetNumber} ${property.StreetName} ${
                    property.StreetSuffix
                  }, ${property.City.split(" ")[0]}, ${
                    property.StateOrProvince
                  }`}
                />
              </div>

              {/* View map link */}
              <div className="mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  View map of nearby restaurants, grocery stores, and more.
                </a>
              </div>
            </div>

            {/* Add Price History component */}
            <PriceHistory priceHistory={priceHistory} />
          </div>

          {/* Floating Resale Button */}
          <FloatingResaleButton />

          {/* Sidebar */}
          <div className="space-y-6  top-6">
            {/* Booking Form */}
            <div className="bg-white p-1 rounded-lg sticky top-6 mt-16 mt-md-0">
              <BookingForm
                propertyId={property.ListingKey}
                address={`${property.StreetNumber} ${property.StreetName}`}
                price={property.ListPrice}
                transactionType={property.TransactionType}
              />
            </div>

            {/* FAQ Section */}
          </div>
        </div>

        {/* <div className="py-5 my-md-5 my-0" id="contact">
          <div className="max-w-2xl mx-auto px-4 pt-6">
            <div className="row justify-content-center">
              <Image
                src="/contact-bottom-2.png"
                alt="Contact bottom"
                width={300}
                height={250}
                className="img-fluid w-25 w-smm-50 mb-3"
              />
            </div>
            <h2 className="fw-bolder fw-boldie text-center fs-3 ">
              Looking to buy a preconstruction home ?
            </h2>

            <div>
              <BottomContactForm
                proj_name="All"
                city="Home Page"
              ></BottomContactForm>
              <div className="d-flex">
                <p className="small-text2 mb-3 text-center">
                  I agree to receive marketing and customer service calls and
                  text messages from Homebaba Technologies. Consent is not a
                  condition of purchase. Msg/data rates may apply. Msg frequency
                  varies. Reply STOP to unsubscribe. Privacy Policy & Terms of
                  Service.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="mt-6 ">
          <ResaleFAQ property={property} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PropertyDetailPage:", error);
    notFound();
  }
}
