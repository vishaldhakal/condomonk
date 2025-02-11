import TimeAgo from "@/helper/timeAgo";
import Link from "next/link";
import "@/styles/homeOverview.css";

const HomeOverview = ({ property }) => {
  const formatNumber = (value) => {
    if (value != null) {
      return Number(value).toLocaleString("en-US");
    } else {
      return "N/A"; // or any default value or message you prefer
    }
  };
  const getCommunityFeatures = () => {
    return property?.PropertyFeatures.join(", ");
  };
  return (
    <div className="pt-4 pb-4 mt-12 md:mt-12">
      <div className="rounded-md border-0">
        <h2 className="font-semibold pb-3 text-2xl sm:text-3xl">
          Home Overview
        </h2>
        <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
          <div className="col-span-1 md:col-span-1 border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className=" text-black">Last check for updates</p>
          </div>
          <div className="col-span-1 md:col-span-1 border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="text-black">
              <TimeAgo />
            </p>
          </div>

          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Virtual tour</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              <Link href={property?.VirtualTourURL || ""} target="_blank">
                Tour Now
              </Link>
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Basement information</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              {property?.Basement ? `${property?.Basement.join(",")}` : "None"}
            </p>
          </div>

          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Building size</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              {property.BuildingAreaTotal}
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Status</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              {property.Status === "A" ? "Active" : "In-Active"}
            </p>
          </div>
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
            <p className="cardd-subtitle_bg-black ">Maintenance fee</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              ${formatNumber(property?.AssociationFee)}
            </p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Year built</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
            <p className="cardd-subtitle_bg-black">
              {property.AssessmentYear || "--"}
            </p>
          </div>
        </div>

        {/* Collapse toggle */}
        <input type="checkbox" id="collapse-toggle" className="hidden" />

        {/* Collapsible content */}
        <div className="collapse-content">
          {/* Interior */}
          <h5 className="py-2  pt-5 font-medium">Interior</h5>
          <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Total bathrooms</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.BathroomsTotalInteger}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Full baths</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.BathroomsTotalInteger}
              </p>
            </div>
          </div>

          <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">
                Number of above grade bedrooms
              </p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.RoomsAboveGrade}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Number of rooms</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {Number(property.RoomsAboveGrade) +
                  Number(property.RoomsBelowGrade)}
              </p>
            </div>
          </div>

          <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Family room available</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property?.DenFamilyroomYN}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Laundry information</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.LaundryFeatures.join(", ")}
              </p>
            </div>
          </div>

          {/* Exterior */}
          <h5 className="py-2  pt-5 font-medium">Exterior</h5>
          <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Construction materials</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.ConstructionMaterials.join(", ")}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Other structures</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.OtherStructures.join(", ")}
              </p>
            </div>
          </div>

          <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Total garage spaces</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {formatNumber(property.GarageParkingSpaces)}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Number parking spaces</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.ParkingSpaces}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Parking Features</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.ParkingFeatures.join(", ")}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Garage features</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">{property.GarageType}</p>
            </div>
          </div>

          <div className={`grid grid-cols-2  md:grid-cols-4 w-100 flex-wrap`}>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Has basement (y/n)</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.Basement.length > 0 ? "Yes" : "No"}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Has garage (y/n)</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.GarageType ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* Amenities / Utilities */}
          <h5 className="py-2  pt-5 font-medium">Amenities / Utilities</h5>
          <div className={`grid grid-cols-2 md:grid-cols-4 w-100 flex-wrap`}>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Cooling</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.Cooling.join(", ")}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Heat source</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">{property?.HeatSource}</p>
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

          {/* Location */}
          <h5 className="py-2  pt-5 font-medium">Location</h5>
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
              <p className="cardd-subtitle_bg-black">
                {getCommunityFeatures()}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Faces Direction</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 px-4">
              <p className="cardd-subtitle_bg-black">
                {property.DirectionFaces}
              </p>
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
        </div>

        {/* Toggle button */}
        <label
          htmlFor="collapse-toggle"
          className="mt-2 py-[3px] font-semibold rounded-lg sm:my-2 text-black hover:text-[#e6a6d7] mb-4 hover:underline cursor-pointer"
        >
          <span className="collapse-more">See More</span>
          <span className="collapse-less">See Less</span>
        </label>
      </div>
    </div>
  );
};

export default HomeOverview;
