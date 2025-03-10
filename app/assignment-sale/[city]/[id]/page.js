import { Suspense } from "react";
import AssignmentDetail from "@/components/assignment/AssignmentDetail";
import AssignmentRelated from "@/components/assignment/AssignmentRelated";

async function getAssignment(id) {
  let getid = id.split("-");
  let nmid = getid[getid.length - 1];
  try {
    const res = await fetch(
      `https://api.toassign.com/public/assignments/${nmid}?options=detailed`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch assignment details");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading assignment details:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const ass = await getAssignment(params.id);
  const assignment = ass.data;

  if (!assignment) {
    return {
      title: "Assignment Not Found | Condomonk",
      description: "The requested assignment could not be found.",
    };
  }

  return {
    title: `${assignment.project_name} - ${assignment.unit_type} Assignment | Condomonk`,
    description: `${assignment.unit_type} assignment for sale at ${assignment.project_name} by ${assignment.developer} in ${assignment.region}. Occupancy: ${assignment.occupancy_date}. Price: ${assignment.price}.`,
    openGraph: {
      title: `${assignment.project_name} - ${assignment.unit_type} Assignment | Condomonk`,
      description: `${assignment.unit_type} assignment for sale at ${assignment.project_name} by ${assignment.developer} in ${assignment.region}. Occupancy: ${assignment.occupancy_date}. Price: ${assignment.price}.`,
      images: assignment.image1 ? [{ url: assignment.image1 }] : [],
    },
    twitter: {
      title: `${assignment.project_name} - ${assignment.unit_type} Assignment | Condomonk`,
      description: `${assignment.unit_type} assignment for sale at ${assignment.project_name} by ${assignment.developer} in ${assignment.region}. Occupancy: ${assignment.occupancy_date}. Price: ${assignment.price}.`,
      images: assignment.image1 ? [{ url: assignment.image1 }] : [],
    },
    alternates: {
      canonical: `https://condomonk.ca/assignment-sale/${params.city}/${params.id}`,
    },
  };
}

export default async function AssignmentDetailPage({ params }) {
  const ass = await getAssignment(params.id);
  const assignment = ass.data;

  let aid = params.id.split("-");
  let nmid = aid[aid.length - 1];

  if (!assignment) {
    return (
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Assignment Not Found</h1>
          <p className="text-gray-600 mb-8">
            The assignment you are looking for could not be found or may have
            been removed.
          </p>
          <a
            href="/assignment-sale"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Browse All Assignments
          </a>
        </div>
      </main>
    );
  }

  // Extract property type from unit_type for related assignments
  const propertyType =
    assignment.unit_type?.includes("Condo") ||
    assignment.unit_type?.includes("1B") ||
    assignment.unit_type?.includes("2B") ||
    assignment.unit_type?.includes("3B")
      ? "Condo"
      : assignment.unit_type?.includes("Town")
      ? "Townhouse"
      : "Condo";

  return (
    <main>
      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            Loading assignment details...
          </div>
        }
      >
        <AssignmentDetail assignment={assignment} />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-48 flex items-center justify-center">
            Loading related assignments...
          </div>
        }
      >
        <AssignmentRelated
          currentAssignmentId={parseInt(params.nmid)}
          region={assignment.region}
          propertyType={propertyType}
        />
      </Suspense>
    </main>
  );
}
