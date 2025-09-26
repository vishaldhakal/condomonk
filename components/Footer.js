"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Newsletter from "./Newsletter";

const Footer = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/Linkdmin")) {
    return <></>;
  }

  // Check if we're on a resale page
  const isResalePage = pathname.startsWith("/resale");

  return (
    <div className="pt-5">
      <footer className="w-full py-5">
        <div className=" mx-auto px-4">
          <div className="max-w-6xl mx-auto pt-5 mt-0 md:mt-10">
            <div className="space-y-4">
              <h3 className="text-center font-bold text-2xl font-[var(--font-family2)]">
                {isResalePage
                  ? "Homes for sale in Ontario"
                  : "Pre construction homes in Canada"}
              </h3>
              <div className="text-center pt-2">
                <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center justify-center text-xs">
                  {cities &&
                    cities.map((city) => (
                      <li key={city.id} className="mb-2">
                        <Link
                          href={
                            isResalePage
                              ? `/resale/ontario/${city.slug.toLowerCase()}/homes-for-sale`
                              : `/${city.slug}`
                          }
                          className="hover:text-blue-600 transition-colors"
                        >
                          <span>
                            {isResalePage
                              ? `Homes for sale in ${city.name}`
                              : `Pre construction homes in ${city.name}`}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto px-4">
          <div className="max-w-6xl mx-auto pt-5 mt-0 md:mt-10">
            <div className="space-y-4">
              <h3 className="text-center font-bold text-2xl font-[var(--font-family2)]">
                {isResalePage
                  ? "Detached Homes for sale in Ontario"
                  : "Pre construction townhomes in Canada"}
              </h3>
              <div className="text-center pt-2">
                <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center justify-center text-xs">
                  {cities &&
                    cities.map((city) => (
                      <li key={city.id} className="mb-2">
                        <Link
                          href={
                            isResalePage
                              ? `/resale/ontario/${city.slug.toLowerCase()}/detached-homes-for-sale`
                              : `/${city.slug}/townhomes`
                          }
                          className="hover:text-blue-600 transition-colors"
                        >
                          <span>
                            {isResalePage
                              ? `Detached Homes for sale in ${city.name}`
                              : `Pre construction townhomes in ${city.name}`}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 my-10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-between pt-10">
            <div className="md:col-span-2 text-center md:text-center">
              <Link href="/" className="text-2xl font-bold mx-auto">
                <span>Condomonk</span>
              </Link>
              <p className="mt-4 text-xs text-gray-600 pr-0 md:pr-10 max-w-xl mx-auto">
                Note: Condomonk is Canada's one of the largest database of new
                pre construction homes. Our comprehensive database is populated
                by our research and analysis of publicly available data.
                Condomonk strives for accuracy and we make every effort to
                verify the information. The information provided on Condomonk.ca
                may be outdated or inaccurate. Condomonk Inc. is not liable for
                the use or misuse of the site's information.The information
                displayed on condomonk.ca is for reference only. Please contact
                a liscenced real estate agent or broker to seek advice or
                receive updated and accurate information.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Contact Us</h4>
              <div className="space-y-2 text-sm">
                <p>4 Robert speck parkway,</p>
                <p>Mississauga, ONTARIO</p>
                <p className="mt-2">
                  <strong>Phone:</strong> <span>647 527 4970</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>info@condomonk.ca</span>
                </p>
              </div>
              <div className="flex space-x-4 mt-4">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 my-10">
          <div className="mb-8">
            <p className="text-xs text-gray-600 max-w-xl text-center mx-auto">
              Condomonk refers potential buyers to real estate agents that are
              licensed in the province where the respective property is located.
              DOLPHIN REALTY INC. is licensed as a real estate brokerage in
              Ontario. Dolphin Realty is a boutique real estate firm that
              empowers clients and agents to achieve success in real estate.
              With state-of-the-art technology, professionalism, and strong
              culture, Dolphin Realty aims to become your most trusted real
              estate partner. Founded in January 1, 2022, Dolphin has completed
              over 500 million in transaction volume by 2023.
            </p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <div className="space-y-6 ">
              <div className="flex justify-center ">
                <img
                  src="/trebb.png"
                  alt="Toronto Regional Real Estate Board"
                  className="h-6"
                />
              </div>
              <p className="text-xs text-gray-600 text-center ">
                The listing data is provided under copyright by the Toronto
                Regional Real Estate Board (TRREB). The information provided
                herein must only be used by consumers that have a bona fide
                interest in the purchase, sale or lease of real estate and may
                not be used for any commercial purpose or any other purpose.
              </p>
            </div> */}
            {/* <div className="space-y-6">
              <div className="flex justify-center">
                <img src="/crea.png" alt="MLS Logo" className="h-6" />
              </div>
              <p className="text-xs text-gray-600 text-center">
                The REALTOR® trademark is controlled by The Canadian Real Estate
                Association (CREA) and identifies real estate professionals who
                are members of CREA. The trademarks MLS®, Multiple Listing
                Service® and the associated logos identify professional services
                rendered by REALTOR® members of CREA.
              </p>
            </div> */}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center py-5 border-t border-gray-200 mt-10">
          <p className="text-sm text-gray-600">
            ©2025 <span>Copyright</span>{" "}
            <strong className="px-1">Condomonk</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Condomonk is a digital asset of Homebaba Technologies Inc.{" "}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
