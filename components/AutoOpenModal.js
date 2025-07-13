"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "./Modal";

export default function AutoOpenModal({ city, proj_name, defaultmessage }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasSeenModal = sessionStorage.getItem("hasSeenProjectModal");
    if (!hasSeenModal) {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenProjectModal", "true");
    }
  }, []);

  return (
    <>
      {showPopup && (
        <CustomModal
          openOnMount={true}
          title="Get First Access to This Project"
          city={city}
          proj_name={proj_name}
          defaultmessage={defaultmessage}
        />
      )}
    </>
  );
}
