import Nformatter from "@/components/Nformatter";
import CondoCard from "@/components/CondoCard";
import Breadcrumb from "@/components/Breadcrumb";
import SideContactForm from "@/components/SideContactForm";
import FixedContactButton from "@/components/FixedContactButton";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import CustomModal from "@/components/Modal";
import ExpandableContent from "@/components/ExpandableContent";
import dynamic from "next/dynamic";
import GoogleMap from "@/components/GoogleMap";
import SocialMediaShare from "@/components/SocialMediaShare";
import Neighbourhood from "@/components/Neighbourhood";
import BannerPrecon from "@/components/BannerPrecon";
import { FileText } from "lucide-react";
import EssentialInfo from "@/components/EssentialInfo";
import Newsletter from "@/components/Newsletter";

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

// Define your functions outside of the component
async function getData(slug) {
  try {
    const res = await fetch(
      `https://api.condomonk.ca/api/preconstructions-detail/${slug}`,
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    notFound();
  }
}

async function getRelatedData(city) {
  try {
    const res = await fetch(
      `https://api.condomonk.ca/api/related-precons/${city}`,
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch related data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching related data:", error);
    notFound();
  }
}

function generateProjectTypeUrl(projectType) {
  if (projectType === "Condo") {
    return "condos";
  } else if (projectType === "Detached") {
    return "detached";
  } else if (projectType === "Townhome") {
    return "townhomes";
  } else if (projectType === "Semi-Detached") {
    return "semi-detached";
  } else {
    return "";
  }
}
export async function generateMetadata({ params }, parent) {
  const data = await getData(params.slug);

  const projectName = data.preconstruction.project_name;
  const projectType = data.preconstruction.project_type || "Condos";
  const projectCity = data.preconstruction.city.name;

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${params.city}/${params.slug}`,
    },
    metadataBase: new URL("https://condomonk.ca"),
    title: `${projectName} ${projectCity} | Book Today`,
    description:
      `${projectName} in ${projectCity}. Check out pricing, floor plans, and availability for ` +
      `${projectName} development by ${data.preconstruction.developer.name}. Register Today!`,
  };
}

export default async function PropertyPage({ params }) {
  const data = await getData(params.slug);
  const related = await getRelatedData(params.city);

  const newImages = (images) => {
    let neImgs = [...images];
    neImgs.forEach((image) => {
      image.image = `https://api.condomonk.ca${image.image}`;
    });
    for (let i = images.length; i < 7; i++) {
      neImgs.push({
        id: 0,
        image: "https://condomonk.ca/noimage.webp",
      });
    }
    return neImgs;
  };

  const convDash = (add) => add.replace(/[\s,]/g, "-");

  const formatPrice = (price) => {
    if (!price || parseInt(price) === 0) return "Pricing not available";
    return `Low $ ${Nformatter(price, 2)}`;
  };

  const checkPricing = (price) => {
    if (!price || parseInt(price) === 0) return "Pricing not available";
    return `Starting from ${formatPrice(price)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <FixedContactButton />

      <main className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}

        <Gallery
          images={data.preconstruction.image}
          project_name={data.preconstruction.project_name}
          project_address={data.preconstruction.project_address}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <div className="pb-20">
              <div className="mb-2">
                <Breadcrumb
                  homeElement={"Home"}
                  separator={
                    <span className="text-gray-400 mx-2">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" />
                      </svg>
                    </span>
                  }
                  activeClasses="text-gray-900"
                  containerClasses="flex items-center text-sm"
                  capitalizeLinks
                />
              </div>
              {/* Project Title Section */}
              <div className="mt-4 mb-2">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-2xl md:text-4xl leading-none text-black font-black whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.preconstruction.project_name}
                  </h1>
                  {data.preconstruction.is_featured == true && (
                    <div className="p-1 px-2  rounded bg-blue-500 text-xs py-2  font-semibold text-white flex justify-between items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="currentColor"
                        className="bi bi-star"
                        viewBox="0 0 22 22"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <h2 className="text-sm md:text-xl font-[400]">
                    Starting From Low $
                    {Nformatter(data.preconstruction.price_starting_from, 2)}
                  </h2>
                  <CustomModal
                    linkText={
                      <button className="text-black border border-black px-3 py-1.5 rounded-full text-xs font-medium hover:text-white hover:bg-black transition-colors inline-flex items-center gap-1">
                        Send me latest info
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
                    proj_name={data.preconstruction.project_name}
                    defaultmessage={`Please send me the latest information of ${data.preconstruction.project_name}. Thank you`}
                    city={data.preconstruction.city.name}
                  />
                </div>
              </div>

              {/* Social Share Buttons */}
              <SocialMediaShare />

              {/* Project Information Grid */}
              <ul className="space-y-3 p-0 m-0">
                <li className="flex items-center text-gray-600">
                  <span className="w-28 font-medium text-black">
                    Developer:
                  </span>
                  <Link
                    href={`/builders/${data.preconstruction.developer.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {data.preconstruction.developer.name}
                  </Link>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-28 font-medium text-black">City:</span>
                  <Link
                    href={`/${params.city}`}
                    className="text-blue-600 hover:underline"
                  >
                    {data.preconstruction.city.name}
                  </Link>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="w-28 font-medium text-black">Address:</span>
                  <span className="flex-1">
                    {data.preconstruction.project_address}
                  </span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-28 font-medium text-black">Type:</span>
                  <Link
                    href={`/${params.city}/${generateProjectTypeUrl(
                      data.preconstruction.project_type
                    )}`}
                    className="text-blue-600 hover:underline"
                  >
                    {data.preconstruction.project_type}
                  </Link>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-28 font-medium text-black">Status:</span>
                  <span className="text-gray-600">
                    {data.preconstruction.status}
                  </span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-28 font-medium text-black">
                    Occupancy:
                  </span>
                  <span className="text-gray-600">
                    {data.preconstruction.occupancy}
                  </span>
                </li>
              </ul>
            </div>

            {/* Project Description */}
            <div className="pb-20">
              <div className="flex  flex-row item-center justify-start gap-4 mb-4">
                {" "}
                <h2 className="text-xl md:text-3xl leading-none text-black font-bold ">
                  About {data.preconstruction.project_name}
                </h2>
                <CustomModal
                  linkText={
                    <button className="text-black border border-black px-3 py-1.5 rounded-full text-xs font-medium hover:text-white hover:bg-black transition-colors inline-flex items-center gap-1">
                      Request more details
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
                  proj_name={data.preconstruction.project_name}
                  defaultmessage={`Please send me the latest information of ${data.preconstruction.project_name}. Thank you`}
                  city={data.preconstruction.city.name}
                />
              </div>
              <div className="prose max-w-none text-gray-600">
                <ExpandableContent
                  content={data.preconstruction.description}
                  maxWords={100}
                />
              </div>
            </div>

            {/* Essential Info Section */}
            <EssentialInfo
              projectName={data.preconstruction.project_name}
              city={data.preconstruction.city.name}
            />

            {/* Map Section */}
            <div className="pb-20 bg-white rounded-xl p-6 shadow-sm ">
              <h2 className="text-xl md:text-3xl font-bold mb-4">
                Project Location
              </h2>
              <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
                <GoogleMap
                  width="100%"
                  height={400}
                  location={data.preconstruction.project_address}
                  zoom={20}
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Note: The exact location of the project may vary from the
                address shown here
              </p>
            </div>

            {/* Walk Score Section */}
            <div className=" bg-white rounded-xl p-6 shadow-sm pb-20">
              <h2 className="text-xl md:text-3xl font-bold mb-4">Walk Score</h2>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  height="500"
                  title="Walk Score"
                  className="w-full"
                  src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=${convDash(
                    data.preconstruction.project_address
                  )}&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737`}
                />
              </div>
            </div>
          </div>

          {/* Sticky Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 w-[350px] min-w-[350px] mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="text-center mb-6">
                  <img
                    src="/contact-bottom-2.png"
                    alt="Agent"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Priority List
                  </h3>
                  <p className="text-sm text-gray-500">
                    Be the first one to know
                  </p>
                </div>

                <SideContactForm
                  proj_name={data.preconstruction.project_name}
                  defaultmessage={`Please send me additional information about ${data.preconstruction.project_name}. Thank you`}
                  city={data.preconstruction.city.name}
                />

                <p className="text-xs text-gray-500 text-center mt-4">
                  By registering, you will be added to our database and may be
                  contacted by a licensed real estate agent.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <BannerPrecon
            projectName={data.preconstruction.project_name}
            developer={data.preconstruction.developer}
            project_type={data.preconstruction.project_type}
            city={data.preconstruction.city.name}
          />
        </div>

        {/* Similar Properties */}
        <section className="mt-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6">
            Similar New Construction Homes in {data.preconstruction.city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related?.map((item) => (
              <CondoCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        <Newsletter />
      </main>
    </div>
  );
}

// Helper component for info items
const InfoItem = ({ label, value }) => (
  <div>
    <span className="font-semibold text-gray-900">{label}: </span>
    <span className="text-gray-700">{value}</span>
  </div>
);
