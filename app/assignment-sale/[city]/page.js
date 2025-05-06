import AssignmentGrid from "@/components/assignment/AssignmentGrid";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import PaginationControls from "@/components/assignment/PaginationControls";

async function getAssignments(page = 1, city = "") {
  let cityFormat = city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  try {
    const res = await fetch(
      `https://api.toassign.com/public/assignments?status=Available&regions=${cityFormat}&page=${page}`,
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

export default async function AssignmentSalePage({ params, searchParams }) {
  // Get the current page from the URL query parameters or default to page 1
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const city = params.city;
  // Fetch data with pagination
  const assignments = await getAssignments(currentPage, city);

  // Extract pagination metadata
  const { current_page, last_page, per_page, total } = assignments.meta || {
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  };

  let title = `Assignments for Sale in ${city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())}`;
  let subtitle = `Browse top price reduced assignments in ${city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())} for sale on Condomonk`;

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
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <h5 className="text-lg font-semibold">
                Why do buyers choose assignment sales in Ontario?
              </h5>
              <div className="text-gray-600">
                Buyers opt for assignment sales to secure a pre-construction
                property at an earlier price before completion. This allows them
                to benefit from market appreciation and sometimes better deals
                compared to resale properties. Additionally, assignment sales
                provide access to new developments that may already be sold out.
              </div>
            </li>
            <li>
              <h5 className="text-lg font-semibold">
                What are the benefits of purchasing an assignment sale property?
              </h5>
              <div className="text-gray-600">
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Lower Prices:</strong> Buyers may get a better price
                    than the current market value.
                  </li>
                  <li>
                    <strong>Brand-New Homes:</strong> Since the unit is still
                    under construction, buyers receive a never-lived-in
                    property.
                  </li>
                  <li>
                    <strong>Potential for Appreciation:</strong> Buyers benefit
                    from property value increases before taking ownership.
                  </li>
                  <li>
                    <strong>Flexible Move-In Timeline:</strong> Since the
                    closing date depends on construction progress, it allows
                    time for financial planning.
                  </li>
                </ul>
              </div>
            </li>
          </ol>
          <p className="text-gray-500 italic">
            Condomonk is one of the leading online marketplaces for
            pre-construction and assignment sales in Ontario. Check out hundreds
            of Ontario Assignment Sales advertised by Licensed Real Estate
            Agents.
            <br />
            Toronto Assignment Sale -{" "}
            <a
              href="https://condomonk.ca/assignment-sale"
              className="text-blue-600 underline"
            >
              Condomonk
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
          city={city}
          defaultMessage={`I am interested in the ${title} assignment in ${city}. Please send me more information.`}
        />
      </div>
    </main>
  );
}

export async function generateMetadata({ params }) {
  const city = params.city;
  let cityFormat = city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    metadataBase: new URL("https://condomonk.ca"),
    title: `Assignment Sale in ${cityFormat} - Condomonk`,
    description: `100+ assignment sales in ${cityFormat}, Ontario, including townhomes, semi-detached, and condos. Explore the best assignment deals on Condomonk.`,
    openGraph: {
      title: `Assignment Sale in ${cityFormat} - Condomonk`,
      description: `100+ assignment sales in ${cityFormat}, Ontario, including townhomes, semi-detached, and condos. Explore the best assignment deals on Condomonk.`,
      images: [{ url: "https://Condomonk.ca/logo.png" }],
    },
    twitter: {
      title: `Assignment Sale in ${cityFormat} - Condomonk`,
      description: `100+ assignment sales in ${cityFormat}, Ontario, including townhomes, semi-detached, and condos. Explore the best assignment deals on Condomonk.`,
      images: [{ url: "https://condomonk.ca/logo.png" }],
    },
    alternates: {
      canonical: `https://condomonk.ca/assignment-sale/${city}`,
    },
  };
}
