import CondoCardHome from "@/components/CondoCardHome";
import Link from "next/link";
import BottomContactForm from "@/components/BottomContactForm";

async function getData() {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions?page_size=16",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home(props) {
  const data = await getData();
  return (
    <>
      <div className="pt-5">
        <div className="container">
          <div className="d-flex flex-column justify-content-start align-items-start">
            <h1 className="main-title">
              New Construction condos in Canada (2023)
            </h1>
            <p className="text-mine">
              1000+ New Preconstruction Condos for sale in Canada | Check out
              plans, pricing, availability for pre construction condos in Canada
            </p>
          </div>
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4 gy-4">
            {data.results.map((item) => (
              <div className="col" key={item.id}>
                <CondoCardHome {...item} />
              </div>
            ))}
          </div>
          <div className="py-5 my-2"></div>
          <h2 className="fw-mine text-center mb-5 accent-line">
            Explore New Construction Condos in These Cities
          </h2>
          <div className="row">
            <div className="col-4 col-md-4 col-xl-4">
              <Link className="d-block properti_city" href={"/toronto"}>
                <div className="thumb">
                  <img
                    src="/cities/toronto.jpg"
                    alt="toronto"
                    className="img-fluid"
                  />
                </div>
                <div className="overlay">
                  <div className="details">
                    <h4>Toronto</h4>
                    <p>Explore Toronto's finest New construction condos</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-4 col-lg-8 col-xl-8">
              <Link className="d-block properti_city" href={"/brampton"}>
                <div className="thumb">
                  <img
                    src="/cities/brampton.jpg"
                    alt="brampton"
                    className="img-fluid"
                  />
                </div>
                <div className="overlay">
                  <div className="details">
                    <h4>Brampton</h4>
                    <p>Brampton's finest New construction condos</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-4 col-lg-8 col-xl-8">
              <Link className="d-block properti_city" href={"/etobicoke"}>
                <div className="thumb">
                  <img
                    src="/cities/etobicoke.jpg"
                    alt="etobicoke"
                    className="img-fluid"
                  />
                </div>
                <div className="overlay">
                  <div className="details">
                    <h4>Etobicoke</h4>
                    <p>Etobicoke's finest New construction condos</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-4 col-md-4 col-xl-4">
              <Link className="d-block properti_city" href={"/mississauga"}>
                <div className="thumb">
                  <img
                    src="/cities/mississauga.jpg"
                    alt="mississauga"
                    className="img-fluid"
                  />
                </div>
                <div className="overlay">
                  <div className="details">
                    <h4>Mississauga</h4>
                    <p>Mississauga's finest New construction condos</p>
                  </div>
                </div>
              </Link>
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
        </div>
      </div>
    </>
  );
}
