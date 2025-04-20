"use client";
import { useState } from "react";

export default function RoomInformation({ rooms }) {
  const [collapse, setCollapse] = useState(true);

  if (!rooms || rooms.length === 0) return null;

  // Helper function to format dimensions
  const formatDimension = (length, width) => {
    if (length && width) {
      return `${length} x ${width} m`;
    }
    return "N/A";
  };

  // Helper function to format features
  const formatFeatures = (room) => {
    return [room.RoomFeature1, room.RoomFeature2, room.RoomFeature3]
      .filter((item) => item)
      .join(", ");
  };

  // Create a reusable row component for cleaner code
  const InfoRow = ({ room }) => (
    <tr className="border-b border-gray-100">
      <td className="py-2 pr-6 text-[14px]">{room.RoomType || "N/A"}</td>
      <td className="py-2 pr-6 text-[14px]">
        {formatDimension(room.RoomLength, room.RoomWidth)}
      </td>
      <td className="py-2 pr-6 text-[14px] text-gray-500">
        {formatFeatures(room) || "N/A"}
      </td>
      <td className="py-2 pr-0 text-[14px]">{room.RoomLevel || "N/A"}</td>
    </tr>
  );

  return (
    <div className="pt-10 mt-14">
      <h1 className="text-[32px] font-semibold mb-2">Room Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-2 pr-6 text-left text-[14px] text-gray-900 font-bold">
                Room Type
              </th>
              <th className="py-2 pr-6 text-left text-[14px] text-gray-900 font-bold">
                Dimension (length x width)
              </th>
              <th className="py-2 pr-6 text-left text-[14px] text-gray-900 font-bold">
                Features
              </th>
              <th className="py-2 pr-0 text-left text-[14px] text-gray-900 font-bold">
                Level
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Always show first 5 rooms */}
            {rooms.slice(0, 4).map((room, index) => (
              <InfoRow key={index} room={room} />
            ))}

            {/* Show remaining rooms when expanded */}
            {!collapse &&
              rooms
                .slice(5)
                .map((room, index) => <InfoRow key={index + 5} room={room} />)}
          </tbody>
        </table>
      </div>

      {/* Only show toggle button if there are more than 5 rooms */}
      {rooms.length > 5 && (
        <button
          onClick={() => setCollapse(!collapse)}
          className="mt-2 text-[14px] font-semibold text-blue-600 hover:text-blue-800"
        >
          {collapse ? "See more" : "See less"}
        </button>
      )}
    </div>
  );
}
