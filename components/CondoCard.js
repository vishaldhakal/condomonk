import Link from "next/link";
import Nformatter from "./Nformatter";
import Image from "next/image";

export default function CondoCard(props) {
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
  {
    props.image.length > 0 ? (
      <Image
        loading="lazy"
        src={`https://api.condomonk.ca${props.image[0].image}`}
        layout="responsive"
        className="img-fluid condocard-img-top"
        alt={`${props.project_name} located at ${props.project_address} image`}
      />
    ) : (
      <p>NO Image</p>
    );
  }
  return (
    <>
      <div className="card border-0 shadow-lg rounded-mine my-3 my-md-0 condocard bigg">
        <div className="position-relative is-loading">
          <Link
            href={`/${props.city.slug}/${props.slug}`}
            className="mylinkk"
            target="_blank"
          >
            {""}
            {props.image.length > 0 ? (
              <img
                loading="lazy"
                src={`https://api.condomonk.ca${props.image[0].image}`}
                layout="responsive"
                className="img-fluid condocard-img-top"
                alt={`${props.project_name} located at ${props.project_address} image`}
              />
            ) : (
              <img
                loading="lazy"
                src="/noimage.webp"
                className="img-fluid condocard-img-top"
                alt={`no image available for ${props.project_name}`}
              />
            )}
          </Link>
          {props.co_op_available && (
            <span className="shadow-lg p-1 px-2 abs2">Co-op Available</span>
          )}
          <span className="d-flex">
            <span className="shadow-lg p-1 ms-2 abs1">{props.status}</span>
            <span className="shadow-lg p-1 mx-2  abs3">
              {props.project_type}
            </span>
          </span>

          <span className="px-2 abs2">
            {props.no + 1 ? props.no + 1 + " " : " "}
          </span>
        </div>

        <Link
          href={`/${props.city.slug}/${props.slug}`}
          className="card-body text-decoration-none text-dark bg-white shadow-lgg rounded-mine"
          target="_blank"
        >
          <div className="card-content pt-2">
            <h3 className="mb-1 cardd-title text-dark font-family2">
              {props.project_name}
            </h3>
            <p className=" mb-1 cardd-subtitle cardd-subtitle-sm">
              By {props.developer.name}
            </p>
            <p className="mb-1 cardd-subtitle ">{props.project_address}</p>
            <p className=" mb-1 cardd-subtitle text-secondary">
              Approx completion: {props.occupancy}
            </p>

            <h4 className="mb-1 text-green-700">
              {checkPricing(props.price_starting_from)}
            </h4>
          </div>
        </Link>
      </div>
    </>
  );
}
