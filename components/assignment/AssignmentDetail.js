"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Breadcrumb from "../Breadcrumb";
import SideContactForm from "../SideContactForm";
import Map from "../Map";
import WalkScore from "../WalkScore";
import useDeviceView from "@/helper/useDeviceView";

const AssignmentDetail = ({ assignment }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(true);
  const { isMobileView } = useDeviceView();

  const features = assignment.short_description
    ? assignment.short_description.split("$|$")
    : [];
  const displayedFeatures = showAllFeatures ? features : features.slice(0, 3);

  const formatCurrency = (value) => {
    if (!value) return "N/A";
    return value.toString().startsWith("$") ? value : `$${value}`;
  };

  function numberWithCommas(x) {
    if (!x) return "0";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Assignment Sale", href: "/assignment-sale" },
    {
      label: assignment.project_name,
      href: `/`,
      isLast: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 py-4">
      {/* Back Button and Breadcrumbs */}
      <div className="sticky top-[0rem] z-20 bg-white w-full border-b">
        <div className="overflow-hidden">
          <Breadcrumb
            items={breadcrumbItems}
            className="scrollbar-hide no-scrollbar border-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
              {assignment.image1 ? (
                <Image
                  src={assignment.image1}
                  alt={`${assignment.project_name} - Main Image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-md text-xs font-semibold">
                {assignment.list_status}
              </div>
              {assignment.diff > 0 && (
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-md text-xs font-semibold">
                  Price Reduced
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white text-black px-3 py-1 rounded-md text-xs font-semibold shadow-md">
                Area: {assignment.sqft} sqft
              </div>
            </div>
          </div>

          {/* Property Header */}
          <div className="mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-black text-black md:text-5xl">
                ${numberWithCommas(assignment.price.replace(/\$|,/g, ""))}
              </h1>
              <span className="ml-2 px-2 py-1 bg-gray-100 text-xs font-semibold rounded-md">
                Assignment
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>{assignment.unit_type || "N/A"}</span>
              <span className="mx-2">•</span>
              <span>{assignment.bathrooms || "N/A"} Baths</span>
              <span className="mx-2">•</span>
              <span>
                {assignment.property_status === "T"
                  ? "Townhouse"
                  : assignment.property_status || "N/A"}
              </span>
              <span className="mx-2">•</span>
              <span className="font-medium">{assignment.region || "N/A"}</span>
            </div>

            <div className="flex items-center text-sm mt-1">
              <span className="text-gray-600">
                {assignment.address || "N/A"}
              </span>
            </div>

            <div className="flex items-center text-sm mt-1">
              <span className="text-gray-600">
                Occupancy - {assignment.occupancy_date || "N/A"}
              </span>
            </div>
          </div>
          {/* Listing Description */}
          <div className="mb-12">
            <h2 className="text-lg md:text-2xl font-semibold md:font-bold mb-3 border-b border-gray-200 pb-2">
              Listing Description
            </h2>
            <div className="text-sm text-gray-700 space-y-2">
              {features.map((feature, index) => (
                <p key={index} className="flex items-center">
                  <FaCheck className="text-black mr-2 text-xs" />
                  <span>{feature}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Price Information */}
          <div className="mb-12">
            <h2 className="text-lg md:text-2xl font-semibold md:font-bold mb-3 border-b border-gray-200 pb-2">
              Price Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Current Price</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.price)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Original Purchase Price</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.original_purchase_price)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Price Per SqFt</p>
                <p className="text-sm font-medium">
                  ${assignment.pps || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Deposit Paid</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.deposit_paid)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Payment</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.total_payment)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Assignment Fee</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.assignment_fee)}
                </p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-12">
            <h2 className="text-lg md:text-2xl font-semibold md:font-bold mb-3 border-b border-gray-200 pb-2">
              Property Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Project Name</p>
                <p className="text-sm font-medium">{assignment.project_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Developer</p>
                <p className="text-sm font-medium">
                  {assignment.developer || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Region</p>
                <p className="text-sm font-medium">
                  {assignment.region || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-medium">
                  {assignment.address || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">House Type</p>
                <p className="text-sm font-medium">
                  {assignment.house_type === "E"
                    ? "Townhouse"
                    : assignment.house_type || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Property Status</p>
                <p className="text-sm font-medium">
                  {assignment.property_status === "T"
                    ? "Townhouse"
                    : assignment.property_status || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Exposure</p>
                <p className="text-sm font-medium">
                  {assignment.exposure || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Parking</p>
                <p className="text-sm font-medium">
                  {assignment.parking || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Garage</p>
                <p className="text-sm font-medium">
                  {assignment.garage || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Locker</p>
                <p className="text-sm font-medium">
                  {assignment.locker || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Balcony</p>
                <p className="text-sm font-medium">
                  {assignment.balcony || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Legal Description</p>
                <p className="text-sm font-medium">
                  {assignment.legal_desc || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-lg md:text-2xl font-semibold md:font-bold mb-3 border-b border-gray-200 pb-2">
              Developer Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Developer Name</p>
                <p className="text-sm font-medium">
                  {assignment.developer || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-lg md:text-2xl font-semibold md:font-bold mb-3 border-b border-gray-200 pb-2">
              Map View of {assignment.project_name} at {assignment.address}
            </h2>
            <Map location={assignment.address} />
          </div>

          <div className="mb-12">
            <h2 className="text-lg md:text-2xl font-semibold md:font-bold mb-3 border-b border-gray-200 pb-2">
              Walk Score of {assignment.project_name} at {assignment.address}
            </h2>
            <WalkScore
              address={assignment.address}
              width={isMobileView ? 350 : 600}
            />
          </div>

          {/* What is an Assignment */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-base font-semibold mb-2">
              What is an Assignment for Sale?
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              An assignment is a sales transaction where the original buyer of a
              property (the "assignor") allows another buyer (the "assignee") to
              take over the buyer's rights and obligations of the Agreement of
              Purchase and Sale, before the original buyer closes on the
              property (that is, where they take possession of the property).
              The assignee is the one who ultimately completes the deal with the
              seller.
            </p>
            <div className="flex justify-end">
              <div className="text-sm font-semibold">
                <span>homebaba</span>
                <span className="ml-1">🍁</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-1">
          <div
            className="p-6 rounded-lg sticky top-5 border-gray-200"
            id="mycontact"
          >
            <div className="flex justify-center mb-4">
              <Image
                src="/aa.png"
                alt="Register Now"
                width={200}
                height={60}
                className="shadow-lg"
              />
            </div>
            <SideContactForm
              projectName={assignment.project_name}
              city={assignment.region}
              message={`I am interested in the ${assignment.project_name} assignment in ${assignment.region}. Please send me more information.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
