// components/Tracker.js
"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const Tracker = ({ siteId }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.customTracker =
      window.customTracker ||
      function () {
        (window.customTracker.q = window.customTracker.q || []).push(arguments);
      };
    window.customTracker("create", siteId);
  }, [siteId]);

  useEffect(() => {
    // Send pageview on route change
    window.customTracker(
      "send",
      "pageview",
      pathname + searchParams.toString()
    );
  }, [pathname, searchParams]);

  return (
    <Script id="tracker-script" src="/tracker.js" strategy="afterInteractive" />
  );
};

export default Tracker;
