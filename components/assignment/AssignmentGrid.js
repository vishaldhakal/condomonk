import AssignmentCard from "./AssignmentCard";
import AssignmentCityNav from "./AssignmentCityNav";
import { FaSpinner } from "react-icons/fa";

const AssignmentGrid = ({ assignments, loading, title, subtitle }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {(title || subtitle) && (
        <div className="mb-8 md:mb-12 text-center">
          {title && (
            <h1 className="text-2xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <AssignmentCityNav />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        </div>
      ) : assignments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-2">No Assignments Found</h3>
          <p className="text-gray-600">
            We couldn't find any assignments matching your criteria. Try
            adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assignments.map((assignment, index) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentGrid;
