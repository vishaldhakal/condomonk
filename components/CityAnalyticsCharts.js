"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatPrice } from "@/utils/formatting";

export default function CityAnalyticsCharts({ data }) {
  if (!data) return null;

  // Prepare data for bedroom price chart
  const bedroomChartData = Object.entries(data.byBedrooms).map(
    ([beds, stats]) => ({
      name: `${beds} Bed${beds === "1" ? "" : "s"}`,
      avgPrice: stats.avgPrice,
      count: stats.count,
    })
  );

  // Prepare data for property type chart
  const propertyTypeChartData = Object.entries(data.byPropertyType)
    .filter(([_, stats]) => stats.count > 0)
    .map(([type, stats]) => ({
      name: type,
      avgPrice: stats.avgPrice,
      count: stats.count,
    }));

  return (
    <div className="space-y-8">
      {/* Price by Bedrooms Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bedroomChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              yAxisId="price"
              orientation="left"
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <YAxis
              yAxisId="count"
              orientation="right"
              tickFormatter={(value) => `${value} listings`}
            />
            <Tooltip
              formatter={(value, name) => [
                name === "avgPrice"
                  ? `$${formatPrice(value)}`
                  : `${value} listings`,
                name === "avgPrice" ? "Average Price" : "Number of Listings",
              ]}
            />
            <Bar
              yAxisId="price"
              dataKey="avgPrice"
              fill="#047857"
              name="Average Price"
            />
            <Bar
              yAxisId="count"
              dataKey="count"
              fill="#0369a1"
              name="Listings"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Price by Property Type Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={propertyTypeChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              yAxisId="price"
              orientation="left"
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <YAxis
              yAxisId="count"
              orientation="right"
              tickFormatter={(value) => `${value} listings`}
            />
            <Tooltip
              formatter={(value, name) => [
                name === "avgPrice"
                  ? `$${formatPrice(value)}`
                  : `${value} listings`,
                name === "avgPrice" ? "Average Price" : "Number of Listings",
              ]}
            />
            <Bar
              yAxisId="price"
              dataKey="avgPrice"
              fill="#047857"
              name="Average Price"
            />
            <Bar
              yAxisId="count"
              dataKey="count"
              fill="#0369a1"
              name="Listings"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
