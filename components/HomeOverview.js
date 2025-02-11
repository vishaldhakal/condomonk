import TimeAgo from "@/helper/timeAgo";
import Link from "next/link";
import "@/styles/homeOverview.css";

const HomeOverview = ({ property }) => {
  const formatNumber = (value) => {
    return value != null ? Number(value).toLocaleString("en-US") : "N/A";
  };

  // Create a reusable row component for cleaner code
  const InfoRow = ({ label, value }) => (
    <>
      <div className="col-span-1 border-b border-gray-200 py-2">
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <div className="col-span-1 border-b border-gray-200 py-2 px-4">
        <p className="text-sm">{value}</p>
      </div>
    </>
  );

  const mainDetails = [
    { label: "Last check for updates", value: <TimeAgo /> },
    {
      label: "Virtual tour",
      value: property?.VirtualTourURL && (
        <Link
          href={property.VirtualTourURL}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Tour Now
        </Link>
      ),
    },
    {
      label: "Status",
      value: property.Status === "A" ? "Active" : "In-Active",
    },
    { label: "Building size", value: property.BuildingAreaTotal },
    { label: "Year built", value: property.AssessmentYear || "--" },
    {
      label: "Maintenance fee",
      value: `$${formatNumber(property?.AssociationFee)}`,
    },
  ];

  const interiorDetails = [
    { label: "Bedrooms", value: property.RoomsAboveGrade },
    { label: "Bathrooms", value: property.BathroomsTotalInteger },
    {
      label: "Total rooms",
      value:
        Number(property.RoomsAboveGrade) + Number(property.RoomsBelowGrade),
    },
    {
      label: "Basement",
      value: property?.Basement?.length ? property.Basement.join(", ") : "None",
    },
  ];

  const exteriorDetails = [
    { label: "Parking spaces", value: property.ParkingSpaces },
    {
      label: "Garage spaces",
      value: formatNumber(property.GarageParkingSpaces),
    },
    {
      label: "Construction",
      value: property.ConstructionMaterials?.join(", "),
    },
  ];

  const getCommunityFeatures = () => {
    return property?.PropertyFeatures.join(", ");
  };

  return (
    <div className="pt-4 mt-8">
      <div className="rounded-md">
        <h2 className="font-semibold pb-3 text-xl">Home Overview</h2>

        {/* Main Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
          {mainDetails.map((item, index) => (
            <InfoRow key={index} {...item} />
          ))}
        </div>

        <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Property sub type</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              {/* {property.PropertySubType} */}
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Heat type</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">{property?.HeatType}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Sewers</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">{property?.Sewers}</p>
          </div>
        </div>

        <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Water source</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              {property.WaterSource.join(", ")}
            </p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Area</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">{property.Area}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 w-100 flex-wrap md:flex-nowrap">
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Community features</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">{getCommunityFeatures()}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Faces Direction</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">{property.DirectionFaces}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 w-100 flex-wrap md:flex-nowrap">
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Cross Street</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">{property.CrossStreet}</p>
          </div>
        </div>

        {/* Collapsible section */}
        <input type="checkbox" id="collapse-toggle" className="hidden" />
        <div className="collapse-content">
          {/* Interior */}
          <h5 className="text-lg font-medium mt-6 mb-2">Interior</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
            {interiorDetails.map((item, index) => (
              <InfoRow key={index} {...item} />
            ))}
          </div>

          {/* Exterior */}
          <h5 className="text-lg font-medium mt-6 mb-2">Exterior</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
            {exteriorDetails.map((item, index) => (
              <InfoRow key={index} {...item} />
            ))}
          </div>
        </div>

        <label
          htmlFor="collapse-toggle"
          className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <span className="collapse-more">View more details</span>
          <span className="collapse-less">Show less</span>
        </label>
      </div>
    </div>
  );
};

export default HomeOverview;
