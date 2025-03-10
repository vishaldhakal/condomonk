import AssignmentCard from "./AssignmentCard";
import AssignmentCityNav from "./AssignmentCityNav";
import { FaSpinner } from "react-icons/fa";

const AssignmentGrid = ({ assignments, loading, title, subtitle }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {(title || subtitle) && (
        <div className="mb-3 md:mb-10">
          {title && (
            <h1 className="text-xl md:text-4xl font-black text-center mb-2">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-gray-600 text-xs md:text-base text-center">
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
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No Assignments Found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any assignments matching your criteria.
          </p>
          <p className="text-gray-600">
            Try adjusting your filters or search terms to see more results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
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
