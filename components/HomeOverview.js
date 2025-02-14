"use client";
import TimeAgo from "@/helper/timeAgo";
import Link from "next/link";
import { useState } from "react";
import "@/styles/homeOverview.css";

const HomeOverview = ({ property }) => {
  const [collapse, setCollapse] = useState(true);

  const formatNumber = (value) => {
    return value != null ? Number(value).toLocaleString("en-US") : "N/A";
  };

  // Create a reusable row component for cleaner code
  const InfoRow = ({ label, value }) => (
    <>
      <div className="col-span-1 py-1 border-b border-gray-100">
        <p className="text-[14px] text-gray-900">{label}</p>
      </div>
      <div className="col-span-1 py-1 border-b border-gray-100">
        <p className="text-[14px] text-gray-500">{value}</p>
      </div>
    </>
  );

  return (
    <div className="pt-4 mt-8">
      <div className="rounded-md">
        <h1 className="text-[32px] font-semibold mb-6">Home Overview</h1>

        {/* Basic Info Grid - Always visible */}
        <div className="grid grid-cols-4 gap-x-2">
          <InfoRow
            label="Last updated"
            value={<TimeAgo timestamp={property.ModificationTimestamp} />}
          />
          <InfoRow
            label="Virtual tour"
            value={
              property?.VirtualTourURL ? (
                <Link
                  href={property.VirtualTourURL}
                  target="_blank"
                  className="text-blue-600"
                >
                  Tour Now
                </Link>
              ) : (
                "None"
              )
            }
          />
          <InfoRow
            label="Basement information"
            value={property?.Basement ? property.Basement.join(", ") : "None"}
          />
          <InfoRow
            label="Building size"
            value={property.BuildingAreaTotal || "--"}
          />
        </div>

        <div className="grid grid-cols-4 gap-x-2">
          <InfoRow
            label="Status"
            value={property.Status === "A" ? "Active" : "In-Active"}
          />
          <InfoRow
            label="Property sub type"
            value={property.PropertySubType || "--"}
          />
          <InfoRow
            label="Maintenance fee"
            value={`$${formatNumber(property?.AssociationFee)}`}
          />
          <InfoRow label="Year built" value={property.AssessmentYear || "--"} />
        </div>

        {/* Collapsible Content */}
        <div className={`block ${collapse ? "hidden" : "block"}`}>
          {/* Interior Section */}
          <h2 className="text-[20px] font-medium mt-6 mb-3">Interior</h2>
          <div className="grid grid-cols-4 gap-x-2">
            <InfoRow
              label="Total bathrooms"
              value={property.BathroomsTotalInteger || "1"}
            />
            <InfoRow
              label="Full baths"
              value={property.BathroomsTotalInteger || "1"}
            />
            <InfoRow
              label="Number of above grade bedrooms"
              value={property.RoomsAboveGrade || "5"}
            />
            <InfoRow
              label="Number of rooms"
              value={
                Number(property.RoomsAboveGrade) +
                  Number(property.RoomsBelowGrade) || "5"
              }
            />
          </div>

          <div className="grid grid-cols-4 gap-x-2">
            <InfoRow
              label="Family room available"
              value={property?.DenFamilyroomYN || "--"}
            />
            <InfoRow
              label="Laundry information"
              value={property.LaundryFeatures?.join(", ") || "Ensuite"}
            />
            <InfoRow
              label="Cooling"
              value={property.Cooling?.join(", ") || "--"}
            />
            <InfoRow label="Heat type" value={property.HeatType || "--"} />
          </div>

          {/* Exterior Section */}
          <h2 className="text-[20px] font-medium mt-6 mb-3">Exterior</h2>
          <div className="grid grid-cols-4 gap-x-2">
            <InfoRow
              label="Construction materials"
              value={property.ConstructionMaterials?.join(", ") || "--"}
            />
            <InfoRow
              label="Other structures"
              value={property.OtherStructures?.join(", ") || "--"}
            />
            <InfoRow
              label="Parking spaces"
              value={property.ParkingSpaces || "--"}
            />
            <InfoRow
              label="Garage spaces"
              value={formatNumber(property.GarageParkingSpaces) || "--"}
            />
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setCollapse(!collapse)}
          className="mt-2 text-[14px] font-semibold text-blue-600 hover:text-blue-800"
        >
          {collapse ? "See more" : "See less"}
        </button>
      </div>
    </div>
  );
};

export default HomeOverview;
