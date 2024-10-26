"use client";
import LightGallery from "lightgallery/react";
import Link from "next/link";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import dynamic from "next/dynamic";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Gallery(props) {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  const newImages = (images) => {
    let neImgs = images.slice(0, 6); // Take only the first 6 images
    neImgs.forEach((image) => {
      if (!image.image.startsWith("https://api.condomonk.ca")) {
        image.image = "https://api.condomonk.ca" + image.image;
      }
    });
    while (neImgs.length < 6) {
      neImgs.push({
        id: 0,
        image: "https://condomonk.ca/noimage.webp",
      });
    }
    return neImgs;
  };

  return (
    <div className="my-3 grid-cont">
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        {newImages(props.images).map((image, no) => (
          <Link
            href={`${image.image}`}
            className={`position-relative g-item grid-item${parseInt(no + 1)}`}
            key={no}
          >
            <img
              alt={`${props.project_name} located at ${
                props.project_address
              } image ${no + 1}`}
              className="img-fluid w-100 h-100 rounded-mine2 lazy"
              src={`${image.image}`}
            />
          </Link>
        ))}
        <div className={`position-relative g-item grid-item7`}>
          <Map address={props.project_address} />
        </div>
      </LightGallery>
    </div>
  );
}
