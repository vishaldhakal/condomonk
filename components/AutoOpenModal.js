"use client";
import CustomModal from "./Modal";

export default function AutoOpenModal({
  city,
  proj_name,
  defaultmessage,
  image,
}) {
  return (
    <CustomModal
      openOnMount={true}
      title="Get First Access to This Project"
      city={city}
      proj_name={proj_name}
      defaultmessage={defaultmessage}
      image={image}
    />
  );
}
