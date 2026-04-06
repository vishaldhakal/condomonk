export const dynamic = "force-dynamic";
import AssignmentGrid from "@/components/assignment/AssignmentGrid";
import AssignmentStats from "@/components/assignment/AssignmentStats";
import ContactForm from "@/components/ContactForm";
import PaginationControls from "@/components/assignment/PaginationControls";
import NotifyPopup from "@/components/NotifyPopup";
async function getAssignments(page = 1) {
  try {
    const res = await fetch(
      `https://api.toassign.com/public/assignments?status=Available&page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch assignments");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading assignments:", error);
    return {
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 12, total: 0 },
    };
  }
}

export default async function AssignmentSalePage({ searchParams }) {
  // Get the current page from the URL query parameters or default to page 1
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;

  // Fetch data with pagination
  const assignments = await getAssignments(currentPage);

  // Extract pagination metadata
  const { current_page, last_page, per_page, total } = assignments.meta || {
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  };

  let title = "📢 Exclusive Price Drop Assignments in GTA";
  let subtitle =
    "Discover the best deals on price-reduced assignments in the Greater Toronto Area.";

  return (
    <>
       <NotifyPopup />
    <main className="pt-10 md:pt-20">
      <AssignmentGrid
        assignments={assignments.data}
        loading={false}
        title={title}
        subtitle={subtitle}
      />

      {/* Pagination Controls */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <PaginationControls
          currentPage={current_page}
          totalPages={last_page}
          totalItems={total}
          itemsPerPage={per_page}
        />
      </div>

      <div className="my-10"></div>
      <div className="px-2">
        <div className="flex flex-col items-center mb-4 md:mb-5">
          <img
            src="/contact-bottom-2.png"
            alt="Real Estate Agent"
            width={300}
            height={300}
            className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
           
          />
          <h2 className="text-xl md:text-3xl font-medium text-gray-800 mb-2 text-center">
            Need help with Assignment Sale?
          </h2>
          <p className="text-gray-600 text-center text-sm md:text-base">
            Don't know where to start? Contact us today!
          </p>
        </div>
        <ContactForm
          projectName={title}
          defaultMessage={`I am interested in the ${title} assignment in Ontario. Please send me more information.`}
        />
      </div>
      
    </main>

    
    </>
     );
}

export async function generateMetadata() {
  return {
    metadataBase: new URL("https://condomonk.ca"),
    title: "Assignment Sale in Ontario - Homebaba",
    description:
      "Find 100+ assignment sales in Ontario, including townhomes, semi-detached, and condos. Explore the best deals on Condomonk.",
    openGraph: {
      title: "Assignment Sale in Ontario - Homebaba",
      description:
        "Find 100+ assignment sales in Ontario, including townhomes, semi-detached, and condos. Explore the best deals on Condomonk.",
      images: [{ url: "https://homebaba.ca/logo.png" }],
    },
    twitter: {
      title: "Assignment Sale in Ontario - Homebaba",
      description:
        "Find 100+ assignment sales in Ontario, including townhomes, semi-detached, and condos. Explore the best deals on Condomonk.",
      images: [{ url: "https://homebaba.ca/logo.png" }],
    },
    alternates: {
      canonical: "https://condomonk.ca/assignment-sale",
    },
  };
}
