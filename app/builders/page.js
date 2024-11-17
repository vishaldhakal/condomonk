import DeveloperCard from "@/components/DeveloperCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import FixedContactButton from "@/components/FixedContactButton";

// Add a timeout promise
const timeoutPromise = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
};

// Add fallback data
const FALLBACK_DATA = {
  results: [],
  count: 0,
};

async function getData() {
  try {
    // Race between fetch and timeout
    const response = await Promise.race([
      fetch("https://api.condomonk.ca/api/developers?page_size=800", {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }),
      timeoutPromise(15000),
    ]);

    // Check if response is valid
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the response text
    let text;
    try {
      text = await response.text();

      // Check if text is empty or whitespace
      if (!text || !text.trim()) {
        console.error("Empty response received");
        return FALLBACK_DATA;
      }

      // Try to parse the JSON
      const data = JSON.parse(text);

      // Validate the data structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid data structure - not an object");
      }

      // Ensure results is an array
      if (!Array.isArray(data.results)) {
        data.results = [];
      }

      // Ensure count is a number
      if (typeof data.count !== "number") {
        data.count = data.results.length;
      }

      return data;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error(
        "Raw response:",
        text ? text.substring(0, 200) : "empty response"
      );
      return FALLBACK_DATA;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return FALLBACK_DATA;
  }
}

// Add static generation hint
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }, parent) {
  const data = await getData();
  const builderCount = data.count || "many"; // Fallback if count is 0 or undefined

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/builders/`,
    },
    openGraph: {
      images: "/social/condomonk-builders.jpg",
    },
    title: `Discover condomonk's Premier Selection of Over ${builderCount}+ Preconstruction Home Builders`,
    description: `From industry veteran builders to up-and-coming talent, condomonk's ${builderCount}+ partnered builders offer years of experience along with creative vision and attentive service.`,
  };
}

export default async function Builders() {
  const data = await getData();

  // Ensure we have an array of results even if data fetch failed
  const builders = Array.isArray(data.results) ? data.results : [];

  return (
    <>
      <FixedContactButton />

      <div className="pt-4 position-relative">
        <div className="container-fluid">
          <div className="py-4 pt-5 text-center">
            <h1 className="main-title mb-4 fs-big">
              Leading Home Builders in Canada
            </h1>
            <div className="row row-cols-1 row-cols-md-3">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <p className="text-secondary">
                  Explore the Builders behind your favourite condominium &
                  freehold home projects. These developers are driven by a
                  passion to transform ideas into tangible structures. Uncover
                  the compelling narratives, innovative designs, and unmatched
                  commitment to precision that position these developers as the
                  driving influence behind the city's most desirable living
                  spaces. These companies have demonstrated leading-edge
                  practices year after year. Check out the list of smaller to
                  bigger builders from a few million dollars to billion dollars
                  of investment.
                </p>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-3">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 gy-4 gx-3 gx-lg-3">
                {builders.map((item) => (
                  <div className="col" key={item.id || Math.random()}>
                    <DeveloperCard {...item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div>
            <p className="text-sm container">
              *Disclaimer: The information on this page about the builder or
              developer, including project status, pricing, floor plans, and
              other related details, is for general informational purposes only.
              It may have been sourced from the builder’s website or publicly
              available data. While we strive to keep the information up to date
              and accurate, changes or discrepancies may occur. For the most
              accurate details, we recommend verifying directly with the
              builder. Condomonk is not responsible for any outdated or
              incorrect information.
              <br />
              If you are a builder and wish to request updates or modifications
              to the information on this page, please contact us at
              info@condomonk.ca.
            </p>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact condomonk Team Today
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name="All"
                    city="Builders Page"
                  ></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>

          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
