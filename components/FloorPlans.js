import CustomModal from "@/components/Modal";
import { FileText } from "lucide-react";

const floorPlanItems = [
  {
    unitType: "1 Bedroom + Den Units",
    description: "With home office space",
    buttonText: "View PDF",
    icon: <FileText className="w-4 h-4" />,
    defaultMessage:
      "Please send me the floor plans for 1 Bedroom + Den Units at",
  },
  {
    unitType: "2 Bedroom Units",
    description: "Perfect for families",
    buttonText: "View PDF",
    icon: <FileText className="w-4 h-4" />,
    defaultMessage: "Please send me the floor plans for 2 Bedroom Units at",
  },
  {
    unitType: "2 Bedroom + Den Units",
    description: "Extra flex space",
    buttonText: "View PDF",
    icon: <FileText className="w-4 h-4" />,
    defaultMessage:
      "Please send me the floor plans for 2 Bedroom + Den Units at",
  },
  {
    unitType: "3 Bedroom Units",
    description: "Spacious layout",
    buttonText: "View PDF",
    icon: <FileText className="w-4 h-4" />,
    defaultMessage: "Please send me the floor plans for 3 Bedroom Units at",
  },
];

export default function FloorPlans({ projectName, city }) {
  return (
    <div className="pb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Floor Plans</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="md:px-6 px-2 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Unit Type
              </th>
              <th className="md:px-6 px-2 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="md:px-6 px-2 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Floor Plans
              </th>
            </tr>
          </thead>
          <tbody>
            {floorPlanItems.map((item, index) => (
              <tr
                key={index}
                className={
                  index !== floorPlanItems.length - 1 ? "border-b" : ""
                }
              >
                <td className="md:px-6 px-2 py-4 font-medium text-gray-900">
                  {item.unitType}
                </td>
                <td className="md:px-6 px-2 py-4 text-gray-700">
                  {item.description}
                </td>
                <td className="md:px-6 px-2 py-4">
                  <CustomModal
                    linkText={
                      <button className="text-black border border-black px-3 py-3 rounded-md text-xs font-medium hover:text-white hover:bg-black transition-colors flex items-center gap-1 whitespace-nowrap w-auto">
                        {item.icon}
                        <span>{item.buttonText}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
                        >
                          <path d="M7 7h10v10"></path>
                          <path d="M7 17 17 7"></path>
                        </svg>
                      </button>
                    }
                    title="Request floor plans"
                    proj_name={projectName}
                    defaultmessage={`${item.defaultMessage} ${projectName}. Thank you`}
                    city={city}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 italic">
        * Floor plans and availability may vary. Contact us for detailed
        information.
      </div>
    </div>
  );
}
