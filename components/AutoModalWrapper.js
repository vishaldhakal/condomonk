"use client";
import { useEffect, useState } from "react";
import AutoOpenModal from "./AutoOpenModal";

export default function AutoModalWrapper({
  city,
  proj_name,
  defaultmessage,
  image,
}) {
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const showModal = searchParams.get("showModal");

    if (showModal === "1") {
      setShouldOpen(true);

      // Clean up the URL by removing ?showModal=1
      searchParams.delete("showModal");
      const newUrl =
        window.location.pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");
      window.history.replaceState(null, "", newUrl);
    }
  }, []);

  if (!shouldOpen) return null;

  return (
    <AutoOpenModal
      city={city}
      proj_name={proj_name}
      defaultmessage={defaultmessage}
      image={image}
    />
  );
}
