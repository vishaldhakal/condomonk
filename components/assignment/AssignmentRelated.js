"use client";

import { useState, useEffect } from "react";
import AssignmentCard from "./AssignmentCard";
import { FaSpinner } from "react-icons/fa";

const AssignmentRelated = ({ currentAssignmentId, region, propertyType }) => {
  const [relatedAssignments, setRelatedAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedAssignments = async () => {
      try {
        setLoading(true);
        // Fetch assignments from the same region and with similar property type
        const response = await fetch(
          `https://api.toassign.com/public/assignments?status=Available&regions=${region}&property_types=${propertyType}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch related assignments");
        }

        const data = await response.json();

        // Filter out the current assignment and limit to 3 related assignments
        const filtered = data
          .filter((assignment) => assignment.id !== currentAssignmentId)
          .slice(0, 3);

        setRelatedAssignments(filtered);
      } catch (error) {
        console.error("Error fetching related assignments:", error);
        setRelatedAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    if (region && propertyType) {
      fetchRelatedAssignments();
    } else {
      setLoading(false);
    }
  }, [currentAssignmentId, region, propertyType]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Similar Assignments</h2>
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        </div>
      </div>
    );
  }

  if (relatedAssignments.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Similar Assignments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default AssignmentRelated;
