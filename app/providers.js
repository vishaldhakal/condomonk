"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="2.5px"
        color="red"
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
};

export default Providers;
