// components/Tracker.js
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const Tracker = ({ siteId }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    window.customTracker =
      window.customTracker ||
      function () {
        (window.customTracker.q = window.customTracker.q || []).push(arguments);
      };
    window.customTracker("create", siteId);
  }, [siteId, mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Send pageview on route change
    const fullPath = pathname + (searchParams ? searchParams.toString() : "");
    window.customTracker("send", "pageview", fullPath);
  }, [pathname, searchParams, mounted]);

  return (
    <>
      {mounted && (
        <Script
          id="tracker-script"
          src="/tracker.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
};

export default Tracker;
