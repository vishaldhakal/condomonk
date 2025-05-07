import CustomModal from "@/components/Modal";
import { FileText } from "lucide-react";

const essentialInfoItems = [
  {
    title: "Floor Plans",
    description: "Flexible living spaces",
    buttonText: "View PDF",
    icon: <FileText className="w-4 h-4" />,
    defaultMessage: "Please send me the floor plans for",
  },
  {
    title: "Parking Price",
    description: "Affordable parking rates",
    buttonText: "Request Info",
    defaultMessage: "Please send me the parking price for",
  },
  {
    title: "Locker Price",
    description: "Secure locker facilities",
    buttonText: "Request Info",
    defaultMessage: "Please send me the locker price for",
  },
  {
    title: "Maintenance Fee",
    description: "Building upkeep costs",
    buttonText: "Request Info",
    defaultMessage: "Please send me the maintenance fee for",
  },
];

export default function EssentialInfo({ projectName, city }) {
  return (
    <div className="pb-20">
      <h2 className="text-xl md:text-3xl font-bold mb-4">Essential Info</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {essentialInfoItems.map((item, index) => (
              <tr
                key={index}
                className={
                  index !== essentialInfoItems.length - 1 ? "border-b" : ""
                }
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-gray-700">{item.description}</td>
                <td className="px-6 py-4">
                  <CustomModal
                    linkText={
                      <button className="text-black border border-black px-3 py-3 rounded-md text-xs font-medium  hover:text-white hover:bg-black transition-colors flex items-center gap-1">
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
