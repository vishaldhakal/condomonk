"use client";

import { formatPrice } from "@/utils/formatting";
import dynamic from "next/dynamic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dynamically import Recharts components
const Charts = dynamic(
  () =>
    import("./Charts").then((mod) => ({
      BarChart: mod.BarChart,
      Bar: mod.Bar,
      XAxis: mod.XAxis,
      YAxis: mod.YAxis,
      CartesianGrid: mod.CartesianGrid,
      Tooltip: mod.Tooltip,
      Legend: mod.Legend,
      ResponsiveContainer: mod.ResponsiveContainer,
    })),
  { ssr: false }
);

// Create a separate Chart component
const PriceComparisonChart = dynamic(() => import("./PriceComparisonChart"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse"></div>,
});

const LeaseComparisonChart = dynamic(() => import("./LeaseComparisonChart"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse"></div>,
});

export function CityAnalytics({ analyticsData }) {
  const { propertyTypeCounts, averagePrices, bedroomAverages } = analyticsData;

  return (
    <div className="analytics-container my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Property Type Distribution */}
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Property Distribution</h3>
          {Object.entries(propertyTypeCounts).map(([type, count]) => (
            <div key={type} className="flex justify-between mb-2">
              <span>{type}:</span>
              <span className="font-medium">{count} Homes</span>
            </div>
          ))}
        </div>

        {/* Average Prices */}
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Average Home Prices</h3>
          {Object.entries(averagePrices).map(([type, price]) => (
            <div key={type} className="flex justify-between mb-2">
              <span>{type}:</span>
              <span className="font-medium">${formatPrice(price)} Average</span>
            </div>
          ))}
        </div>

        {/* Bedroom Averages */}
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Price by Bedrooms</h3>
          {Object.entries(bedroomAverages).map(([bedrooms, { avg, count }]) => (
            <div key={bedrooms} className="flex justify-between mb-2">
              <span>{bedrooms} Bedrooms:</span>
              <span className="font-medium">
                ${formatPrice(avg)} (based on {count} homes)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListingAnalytics({ analyticsData }) {
  // Add null checks for listing properties
  if (!analyticsData) {
    return (
      <div className="analytics-container my-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="stat-card p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Market Comparison</h3>
            <div className="text-center text-gray-500">
              Listing details not available
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="grid grid-cols-1 gap-4">
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Market Comparison</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Average Price of Similar Listings:</span>
              <span className="font-medium">
                ${formatPrice(analyticsData.avgPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                Average {analyticsData.listing.BedroomsTotal} Bed Homes in{" "}
                {analyticsData.city}:
              </span>
              <span className="font-medium">
                ${formatPrice(analyticsData.avgPriceBedrooms)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                Average {analyticsData.listing.PropertyType} Homes in{" "}
                {analyticsData.city}:
              </span>
              <span className="font-medium">
                ${formatPrice(analyticsData.avgPriceType)}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Based on {analyticsData.totalSimilar} similar properties
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommercialAnalytics({ analyticsData }) {
  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }

  const {
    avgPricePerSqft,
    avgLeaseRate,
    propertySubTypeStats,
    similarProperties,
    currentProperty,
  } = analyticsData;

  // Prepare data for price comparison chart
  const priceComparisonData = [
    {
      name: "Current Property",
      "Price per sqft": currentProperty.pricePerSqft,
      "Avg Market Rate": avgPricePerSqft,
    },
  ];

  // Prepare data for lease rate comparison
  const leaseComparisonData = [
    {
      name: "Current Property",
      "Lease Rate": currentProperty.leaseRate,
      "Avg Market Rate": avgLeaseRate,
    },
  ];

  return (
    <div className="analytics-container space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Property Overview */}
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Property Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Property Type:</span>
              <span className="font-medium">
                {currentProperty.PropertySubType}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Area:</span>
              <span className="font-medium">
                {currentProperty.BuildingAreaTotal} sqft
              </span>
            </div>
            <div className="flex justify-between">
              <span>Price per sqft:</span>
              <span className="font-medium">
                ${formatPrice(currentProperty.pricePerSqft)}
              </span>
            </div>
          </div>
        </div>

        {/* Market Comparison */}
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Market Comparison</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Market Average (per sqft):</span>
              <span className="font-medium">
                ${formatPrice(avgPricePerSqft)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Price Difference:</span>
              <span
                className={`font-medium ${
                  currentProperty.pricePerSqft > avgPricePerSqft
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {(
                  ((currentProperty.pricePerSqft - avgPricePerSqft) /
                    avgPricePerSqft) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Comparison Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Price Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${formatPrice(value)}`} />
              <Legend />
              <Bar dataKey="Price per sqft" fill="#8884d8" />
              <Bar dataKey="Avg Market Rate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Similar Properties</h3>
        <div className="space-y-4">
          {similarProperties.map((property, index) => (
            <div key={index} className="border-b pb-2">
              <div className="flex justify-between">
                <span>{property.BuildingAreaTotal} sqft</span>
                <span className="font-medium">
                  ${formatPrice(property.ListPrice)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                ${formatPrice(property.pricePerSqft)} per sqft
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LeaseAnalytics({ analyticsData }) {
  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }

  const { avgLeaseRate, leaseTermStats, similarLeases, currentProperty } =
    analyticsData;

  // Prepare data for lease rate comparison
  const leaseComparisonData = [
    {
      name: "Current Property",
      "Monthly Rate": currentProperty.ListPrice,
      "Avg Market Rate": avgLeaseRate,
    },
  ];

  return (
    <div className="analytics-container space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lease Overview */}
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Lease Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Monthly Rate:</span>
              <span className="font-medium">
                ${formatPrice(currentProperty.LeaseRate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Lease Term:</span>
              <span className="font-medium">
                {currentProperty.LeaseTerm} months
              </span>
            </div>
            <div className="flex justify-between">
              <span>Rate per sqft:</span>
              <span className="font-medium">
                $
                {formatPrice(
                  currentProperty.LeaseRate / currentProperty.BuildingAreaTotal
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Market Comparison */}
        <div className="stat-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Market Comparison</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Market Average Rate:</span>
              <span className="font-medium">${formatPrice(avgLeaseRate)}</span>
            </div>
            <div className="flex justify-between">
              <span>Rate Difference:</span>
              <span
                className={`font-medium ${
                  currentProperty.LeaseRate > avgLeaseRate
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {(
                  ((currentProperty.LeaseRate - avgLeaseRate) / avgLeaseRate) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lease Rate Comparison Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Lease Rate Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leaseComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${formatPrice(value)}`} />
              <Legend />
              <Bar dataKey="Monthly Rate" fill="#8884d8" />
              <Bar dataKey="Avg Market Rate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Similar Leases */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Similar Leases</h3>
        <div className="space-y-4">
          {similarLeases.map((property, index) => (
            <div key={index} className="border-b pb-2">
              <div className="flex justify-between">
                <span>{property.BuildingAreaTotal} sqft</span>
                <span className="font-medium">
                  ${formatPrice(property.LeaseRate)}/month
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {property.LeaseTerm} month term
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
