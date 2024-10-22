import Link from "next/link";
import Nformatter from "./Nformatter";

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

  return (
    <>
      <div className="card border-0 shadow-lg rounded-mine my-3 my-md-0 condocard bigg">
        <div className="position-relative is-loading">
          <Link
            href={`/${props.city.slug}/${props.slug}`}
            className="mylinkk"
            target="_blank"
          >
            {props.is_featured && (
              <span className="p-1 px-2 abs4 rounded bg-primary  font-semibold text-white d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  class="bi bi-star"
                  viewBox="0 0 22 22"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span>Featured</span>
              </span>
            )}
            <img
              src={
                props.image.image != null
                  ? `https://api.condomonk.ca${props.image.image}`
                  : "/noimage.webp"
              }
              className="img-fluid condocard-img-top"
            />
          </Link>
          <span className="d-flex">
            <span className="shadow-lg p-1 ms-2 abs1">{props.status}</span>
            <span className="shadow-lg p-1 mx-2 abs3">
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
            <h4 className="mb-1 text-yellow-500 cardd-price">
              {checkPricing(props.price_starting_from)}
            </h4>
            <p className="mb-1 cardd-subtitle cardd-subtitle-sm">
              By {props.developer.name}
            </p>
            <p className="mb-1 cardd-subtitle ">{props.project_address}</p>
            <p className="mb-1 cardd-subtitle text-secondary">
              Approx completion: {props.occupancy}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
