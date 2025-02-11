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
} from "recharts";
import { formatPrice } from "@/utils/formatting";

export default function PriceComparisonChart({ data }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
  );
}
