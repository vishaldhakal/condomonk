"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatPrice } from "@/utils/formatting";

export default function MarketComparisonChart({ currentPrice, comparisons }) {
  // Prepare data including the current property
  const data = [
    {
      name: "This Property",
      description: "Current listing price",
      price: currentPrice,
    },
    ...comparisons,
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-lg font-bold text-emerald-600">
            ${formatPrice(payload[0].value)}
          </p>
          <p className="text-sm text-gray-600">
            {payload[0].payload.description}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] ml-[-30px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 100,
          }}
          barSize={60}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tickMargin={30}
            tick={{
              fill: "#4B5563",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <YAxis
            tickFormatter={(value) => `$${formatPrice(value)}`}
            width={90}
            tick={{
              fill: "#4B5563",
              fontSize: 12,
            }}
            tickMargin={10}
            axisLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(229, 231, 235, 0.4)" }}
          />
          <Bar dataKey="price" radius={[6, 6, 0, 0]} maxBarSize={80}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#3B82F6" : "#10B981"}
                fillOpacity={index === 0 ? 1 : 0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
