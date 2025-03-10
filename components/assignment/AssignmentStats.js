"use client";

import {
  FaBuilding,
  FaCheckCircle,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

const AssignmentStats = ({ stats }) => {
  const defaultStats = {
    totalAssignments: stats?.totalAssignments || 250,
    availableAssignments: stats?.availableAssignments || 180,
    priceReduced: stats?.priceReduced || 45,
    occupancyThisYear: stats?.occupancyThisYear || 75,
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <FaBuilding className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {defaultStats.totalAssignments}+
            </h3>
            <p className="text-gray-600">Total Assignments</p>
          </div>

          <div className="bg-white p-6 rounded-xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {defaultStats.availableAssignments}
            </h3>
            <p className="text-gray-600">Available Assignments</p>
          </div>

          <div className="bg-white p-6 rounded-xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
              <FaChartLine className="text-red-600 text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {defaultStats.priceReduced}
            </h3>
            <p className="text-gray-600">Price Reduced</p>
          </div>

          <div className="bg-white p-6 rounded-xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {defaultStats.occupancyThisYear}
            </h3>
            <p className="text-gray-600">Occupancy This Year</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Data updated daily. Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentStats;
