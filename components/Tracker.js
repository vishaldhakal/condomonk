"use client";

import { useEffect } from "react";
import Script from "next/script";

const Tracker = ({ siteId }) => {
  useEffect(() => {
    window.customTracker =
      window.customTracker ||
      function () {
        (window.customTracker.q = window.customTracker.q || []).push(arguments);
      };
    window.customTracker("create", siteId);
    window.customTracker("send", "pageview");
  }, [siteId]);

  return (
    <Script id="tracker-script" src="/tracker.js" strategy="afterInteractive" />
  );
};

export default Tracker;
