"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import SideContactForm from "../SideContactForm";
import Map from "../Map";
import WalkScore from "../WalkScore";
import dynamic from "next/dynamic";

const AssignmentDetail = ({ assignment }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      label: assignment.region || "City",
      href: `/assignment-sale/${(assignment.region || "").toLowerCase()}`,
    },
    {
      label: assignment.project_name,
      href: `/assignment-sale/${(assignment.region || "").toLowerCase()}/${
        assignment.id
      }`,
      isLast: true,
    },
  ];

  // Rest of your component code remains the same...
  return (
    <div className="max-w-6xl mx-auto px-3 py-4">
      {/* Back Button and Breadcrumbs */}
      <div className="sticky-top top-[0rem] z-2 bg-white w-full ">
        <div className="overflow-x-auto whitespace-nowrap py-2">
          <nav className="flex items-center space-x-1 text-sm">
            {breadcrumbItems.map((item, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <a
                  href={item.href}
                  className={`hover:text-blue-600 ${
                    item.isLast
                      ? "text-gray-600 pointer-events-none"
                      : "text-black"
                  }`}
                >
                  {item.label}
                </a>
              </span>
            ))}
          </nav>
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
            <div className="text-sm text-gray-700 space-y-2 mb-0">
              {features.map((feature, index) => (
                <p key={index} className="flex items-center mb-0">
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
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Current Price</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.price)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">
                  Original Purchase Price
                </p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.original_purchase_price)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Price Per SqFt</p>
                <p className="text-sm font-medium">
                  ${assignment.pps || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Deposit Paid</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.deposit_paid)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Total Payment</p>
                <p className="text-sm font-medium">
                  {formatCurrency(assignment.total_payment)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Assignment Fee</p>
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
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Project Name</p>
                <p className="text-sm font-medium">{assignment.project_name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Developer</p>
                <p className="text-sm font-medium">
                  {assignment.developer || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Region</p>
                <p className="text-sm font-medium">
                  {assignment.region || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Address</p>
                <p className="text-sm font-medium">
                  {assignment.address || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">House Type</p>
                <p className="text-sm font-medium">
                  {assignment.house_type === "E"
                    ? "Townhouse"
                    : assignment.house_type || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Property Status</p>
                <p className="text-sm font-medium">
                  {assignment.property_status === "T"
                    ? "Townhouse"
                    : assignment.property_status || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Exposure</p>
                <p className="text-sm font-medium">
                  {assignment.exposure || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Parking</p>
                <p className="text-sm font-medium">
                  {assignment.parking || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Garage</p>
                <p className="text-sm font-medium">
                  {assignment.garage || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Locker</p>
                <p className="text-sm font-medium">
                  {assignment.locker || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Balcony</p>
                <p className="text-sm font-medium">
                  {assignment.balcony || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 mb-0">Legal Description</p>
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
                <p className="text-xs text-gray-500 mb-0">Developer Name</p>
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
            <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
              <Map location={assignment.address} />
            </div>
          </div>

          {/* Walk Score Section */}
          <div className="mb-12">
            <h2 className="text-lg md:text-2xl font-semibold md:font-bold mb-3 border-b border-gray-200 pb-2">
              Walk Score of {assignment.project_name} at {assignment.address}
            </h2>
            <div className="w-full">
              <WalkScore
                address={assignment.address}
                width={isMobileView ? 350 : 600}
                height={400}
              />
            </div>
          </div>

          {/* What is an Assignment */}
          <div className="mb-12 bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                <span>Condomonk</span>
                <span className="ml-1">🍁</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-1 z-2">
          <div
            className="p-6 rounded-lg sticky top-5 border-gray-200 shadow-xl"
            id="mycontact"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="">
                <Image
                  src="/contact-bottom-2.png"
                  alt="Agent"
                  width={120}
                  height={120}
                  className="rounded-full "
                />
              </div>
              <div className=" text-center">
                <h5 className="font-bold text-xl mb-1">Receive a Call</h5>
                <p className="text-[10px] flex items-center justify-center gap-1">
                  Condomonk Verified Partner
                  <span>
                    <Image
                      src="/cc.png"
                      alt="verified"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  </span>
                </p>
              </div>
            </div>
            <SideContactForm
              projectName={assignment.project_name}
              city={assignment.region}
              defaultmessage={`I am interested in the ${assignment.project_name} assignment in ${assignment.region}. Please send me more information.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
