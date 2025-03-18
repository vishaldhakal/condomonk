import Link from "next/link";
import Nformatter from "./Nformatter";
import Image from "next/legacy/image";

export default function FeaturedCard(props) {
  function checkPricing(price) {
    if (parseInt(price) > 0) {
      return `Starting from low $${Nformatter(price, 2)}`;
    } else {
      return `Pricing not available`;
    }
  }

  function daysCount(x) {
    let date_1 = new Date(x);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (TotalDays == 0) {
      return "Today";
    } else {
      return Math.abs(TotalDays) + " day ago ";
    }
  }

  return (
    <>
      <div className="card bigg shadow-lg">
        <div className="row g-0">
          <div className="col-md-6">
            <div className=" position-relative is-loading">
              <Link
                href={`/${props.city.slug}/${props.slug}`}
                className="mylinkk"
                target="_blank"
              >
                {props.image ? (
                  <img
                    loading="lazy"
                    src={`https://api.condomonk.ca${props.image.image}`}
                    layout="responsive"
                    className="img-fluid featuredcard-img-top"
                    alt={`${props.project_name} located at ${props.project_address} image`}
                    fetchPriority="high"
                  />
                ) : (
                  <img
                    loading="lazy"
                    src="/noimage.webp"
                    layout="responsive"
                    className="img-fluid featuredcard-img-top"
                    alt={`no image available for ${props.project_name}`}
                    fetchPriority="high"
                  />
                )}
              </Link>
              {props.co_op_available && (
                <span className="shadow-lg abs2">Co-op Available</span>
              )}
              <span className="d-flex">
                <span className="shadow-lg fstatus ">{props.status}</span>
              </span>

              <span className="px-2 abs2">
                {props.no + 1 ? props.no + 1 + " " : " "}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <Link
                href={`/${props.city.slug}/${props.slug}`}
                className="card-body text-decoration-none   shadow-lgg rounded-mine"
                target="_blank"
              >
                <div className="card-content pt-md-2 pt-0 col">
                  <h3 className="mb-1 cardd-title text-dark font-family2 ">
                    {props.project_name}
                  </h3>
                  <p className=" mb-1 cardd-subtitle ">
                    By {props.developer.name}
                  </p>
                  <p className="mb-1 text-yellow-500 cardd-price ">
                    {checkPricing(props.price_starting_from)}
                  </p>

                  <p className="mb-1 cardd-subtitle  text-dark">
                    {props.project_address}
                  </p>
                  <p className="mb-1 text-dark cardd-subtitle">
                    Building Type: {props.project_type}
                  </p>
                  <p className="mb-4 cardd-subtitle  text-secondary">
                    Approx completion: {props.occupancy}
                  </p>
                </div>
              </Link>
              <Link
                href={`/${props.city.slug}/${props.slug}#contact`}
                className=" btn btn-lg fbtn "
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
