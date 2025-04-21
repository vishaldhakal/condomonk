import Link from "next/link";

export default function FixedContactButton() {
  return (
    <>
      <Link href="#contact" className="floating  fixcontact">
        <div className=" shadow-lg rounded-mine d-flex flex-column">
          <div className="btn my-sm-0 ms-md-3 d-flex align-items-center gap-2">
            <img
              src="/COA-agent-pic.jpg"
              alt="agent pic"
              className="img-fluid img-call-height"
            />
            <span className="d-flex flex-column justify-content-start text-dark text-sm">
              <b>Send me latest info</b>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
