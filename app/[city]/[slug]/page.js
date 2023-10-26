import Nformatter from "@/components/Nformatter";
import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
async function getData(slug) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-detail/" + slug,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getRelatedData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/related-precons/" + city,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}
export async function generateMetadata({ params }, parent) {
  const data = await getData(params.slug);

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${params.city}/${params.slug}`,
    },
    title:
      data.project_name + " in " + data.city.name + "by " + data.developer.name,
    description:
      data.project_name +
      " in " +
      data.city.name +
      "by " +
      data.developer.name +
      " prices starting from " +
      Nformatter(data.price_starting_from, 2) +
      " CAD",
  };
}

export default async function Home({ params }) {
  const data = await getData(params.slug);
  const related = await getRelatedData(params.city);

  const newImages = (images) => {
    let neImgs = images;
    neImgs.forEach((image) => {
      image.image = "https://api.condomonk.ca" + image.image;
    });
    for (let i = images.length; i < 7; i++) {
      neImgs.push({
        id: 0,
        image: "https://condomonk.ca/noimage.webp",
      });
    }
    return neImgs;
  };

  const convDash = (add) => {
    var result = add.split(" ").join("-");
    var newresult = result.split(",").join("-");
    return newresult;
  };

  const doTOcheck = (noo) => {
    if (parseInt(noo) != 0) {
      return "- High $ " + Nformatter(noo, 2);
    }
  };

  const doTOcheck2 = (noo) => {
    if (parseInt(noo) != 0) {
      return "Low $ " + Nformatter(noo, 2);
    } else {
      return "Pricing not available";
    }
  };

  function checkPricing(prii, priito) {
    if (parseInt(prii) == 0) {
      return `Pricing not available`;
    } else {
      return doTOcheck2(prii) + doTOcheck(priito);
    }
  }

  return (
    <>
      <div className="pt-1">
        <div className="container">
          <div className="my-3 grid-cont">
            {newImages(data.image)
              ?.slice(0, 7)
              .map((image, no) => (
                <a
                  href="#"
                  className={
                    "position-relative g-item grid-item" + parseInt(no + 1)
                  }
                  key={no}
                >
                  <img
                    alt={`${data.project_name} located at ${
                      data.project_address
                    } image ${no + 1}`}
                    className="img-fluid w-100 h-100 rounded-mine"
                    src={`${image.image}`}
                  />
                </a>
              ))}
          </div>
          <div className="container px-0 px-sm-3 pt-3">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 justify-content-center">
              <div className="col col-md-6">
                <div className="screenshot">
                  <div className="row row-cols-1 row-cols-sm-2">
                    <div className="col-sm-12">
                      <h1 className="side fw-bold">{data.project_name}</h1>
                      <p className="mb-0">
                        By <strong>{data.developer.name}</strong>
                      </p>
                      <p className="mt-1 mb-0 me-2">Price Starting from</p>
                      <h2 className="text-mine fs-3 fw-mine3 mt-1 mb-0">
                        {checkPricing(data.price_starting_from, data.price_to)}
                      </h2>
                      <div className="mb-1 fw-bold">
                        <span scope="col">{data.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="my-5"></div>
                  <div id="features">
                    <div className="mb-5 mt-4">
                      <div className="rounded-mine">
                        <div>
                          <div className="mb-1">
                            <span className="me-2 fw-mine2 mb-2 fs-mine3">
                              Project Location:
                            </span>
                            <span scope="col">{data.city.name}</span>
                          </div>
                          <div className="mb-1">
                            <p className="d-flex align-items-center my-0">
                              <svg
                                width="14"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
                                  fill="#000000"
                                />
                              </svg>
                              <span className="mx-1"></span>
                              <span className="text-dark">
                                {data.project_address}
                              </span>
                            </p>
                          </div>
                          <div className="mb-1">
                            <span className="me-2 fw-mine2 mb-2 fs-mine3">
                              Developed by:
                            </span>
                            <span scope="col">{data.developer.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>
                      <i>
                        {data.project_name} is a pre construction project
                        developed by {data.developer.name} in the city of{" "}
                        {data.city.name}. The project status is {data.status} .
                      </i>
                    </p>
                    <div className="py-5 pt-3">
                      <h2 className="fw-bold fs-3">
                        Information about {data.project_name} in{" "}
                        {data.city.name}
                      </h2>
                      <div className="text-start my-3 text-inside">
                        <div
                          className="iframe-container"
                          dangerouslySetInnerHTML={{
                            __html: data.description,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 my-5">
                  <h2 className="fw-bold fs-4 pb-3">
                    Walk Score for {data.project_name}
                  </h2>

                  <div>
                    <div className="p-1">
                      <div className="walkscore-container mt-2 p-1 rounded-mine">
                        <iframe
                          height="500px"
                          title="Walk Score"
                          className="ham"
                          width="100%"
                          src={
                            "https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=" +
                            convDash(data.project_address) +
                            "&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737"
                          }
                        ></iframe>
                        <script
                          type="text/javascript"
                          src="https://www.walkscore.com/tile/show-walkscore-tile.php"
                        ></script>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-md-4 ps-md-2 pt-5 pt-md-0">
                <div className="py-4 py-md-0"></div>
                <div className="myps3 mt-mine pe-0" id="mycontact">
                  <div className="text-center"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
                Are you looking to buy a preconstruction home for the first time
                ?
              </h2>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Don't know where to start ? Contact Condomonk now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5"></div>
          <div>
            <div className="d-flex flex-column">
              <h2 className="main-title">
                Similar New Construction condos in {data.city.name} ( 2023 )
              </h2>
            </div>
            <div className="py-2"></div>
            <div className="row row-cols-1 row-cols-md-4 gy-4">
              {related &&
                related.map((item) => (
                  <div className="col" key={item.id}>
                    <CondoCard {...item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
