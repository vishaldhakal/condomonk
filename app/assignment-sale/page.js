import AssignmentGrid from "@/components/assignment/AssignmentGrid";
import AssignmentStats from "@/components/assignment/AssignmentStats";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import PaginationControls from "@/components/assignment/PaginationControls";

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

  let title = "🔥 Hot Assignments Deals in GTA!";
  let subtitle =
    "Browse top price reduced assignments across the Greater Toronto Area";

  return (
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

      <div className="max-w-4xl mx-auto mt-20 px-6 md:px-0">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold pb-2 underline">
            Ontario Assignment Sale
          </h3>
          <p className="text-gray-700">
            Check out Pre-construction Condos, Townhomes & Detached home
            assignments for sale in Ontario, Canada.
          </p>
          <ol className="space-y-4">
            <li>
              <h5 className="text-lg font-semibold">
                Is an Assignment legal in Ontario?
              </h5>
              <p className="text-gray-600">
                Unless prohibited in writing in the original agreement, it is
                mostly legally permitted. Some developers may charge a fee for
                assignment sales. It's best to confirm with the builder directly
                regarding any restrictions and fees.
              </p>
            </li>
            <li>
              <h5 className="text-lg font-semibold">
                What is a preconstruction assignment sale?
              </h5>
              <p className="text-gray-600">
                An assignment is a sales transaction where the original buyer of
                a property (the "assignor") allows another buyer (the
                "assignee") to take over the buyer's rights and obligations of
                the Agreement of Purchase and Sale before the original buyer
                closes on the property.
              </p>
            </li>
          </ol>
          <p className="text-gray-500 italic">
            Homebaba is one of the leading online marketplaces for
            pre-construction and assignment sales in Ontario. Check out hundreds
            of Ontario Assignment Sales advertised by Licensed Real Estate
            Agents.
            <br />
            Toronto Assignment Sale -{" "}
            <a
              href="https://homebaba.ca/assignment-sale"
              className="text-blue-600 underline"
            >
              Homebaba
            </a>
            .
          </p>
        </div>
      </div>

      <div className="my-20"></div>
      <div className="px-2">
        <div className="flex flex-col items-center mb-4 md:mb-5">
          <Image
            src="/contact-bottom-2.png"
            alt="Real Estate Agent"
            width={300}
            height={300}
            className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
            priority
          />
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
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
  );
}

export async function generateMetadata() {
  return {
    title: "Assignment Sale in Ontario - Homebaba",
    description:
      "Find 100+ assignment sales in Ontario, including townhomes, semi-detached, and condos. Explore the best deals on Homebaba.",
    openGraph: {
      title: "Assignment Sale in Ontario - Homebaba",
      description:
        "Find 100+ assignment sales in Ontario, including townhomes, semi-detached, and condos. Explore the best deals on Homebaba.",
      images: [{ url: "https://homebaba.ca/logo.png" }],
    },
    twitter: {
      title: "Assignment Sale in Ontario - Homebaba",
      description:
        "Find 100+ assignment sales in Ontario, including townhomes, semi-detached, and condos. Explore the best deals on Homebaba.",
      images: [{ url: "https://homebaba.ca/logo.png" }],
    },
    alternates: {
      canonical: "https://homebaba.ca/assignment-sale",
    },
  };
}
