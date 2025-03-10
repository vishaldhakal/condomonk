import DeveloperCard from "@/components/DeveloperCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import FixedContactButton from "@/components/FixedContactButton";

async function getData() {
  try {
    const res = await fetch(
      "https://api.condomonk.ca/api/developers?page_size=800",
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text(); // Get response as text first
    try {
      return JSON.parse(text); // Then try to parse it
    } catch (e) {
      console.error("JSON Parse Error:", e);
      console.error("Received data:", text);
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    notFound();
  }
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  let city = "Calgary, Alberta";
  const data = await getData();
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/builders/`,
    },
    openGraph: {
      images: "/social/condomonk-builders.jpg",
    },
    title: `Discover condomonk's Premier Selection of Over ${data.count}+ Preconstruction Home Builders`,
    description: `From industry veteran builders to up-and-coming talent, condomonk's ${data.count}+ partnered builders offeryears of experience along with creative vision and attentive service.`,
  };
}

export default async function Builders() {
  const data = await getData();
  return (
    <>
      <FixedContactButton></FixedContactButton>
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
                {data.results &&
                  data.results.map((item) => (
                    <div className="col" key={item.id}>
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
