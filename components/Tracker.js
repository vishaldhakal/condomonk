"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const Tracker = ({ customerId }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [trackerLoaded, setTrackerLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !trackerLoaded) return;

    // Initialize tracker
    window.widgetTracker.create(customerId);

    // Track initial pageview
    window.widgetTracker.instance.trackPageview();

    // Set up form tracking
    const trackFormSubmission = (event) => {
      if (event.target.tagName === "FORM") {
        window.widgetTracker.instance.trackForm(event.target);
      }
    };
    document.addEventListener("submit", trackFormSubmission);

    return () => {
      document.removeEventListener("submit", trackFormSubmission);
    };
  }, [customerId, mounted, trackerLoaded]);

  useEffect(() => {
    if (!mounted || !trackerLoaded) return;

    // Track pageview on route change
    window.widgetTracker.instance.trackPageview();
  }, [pathname, mounted, trackerLoaded]);

  const handleScriptLoad = () => {
    console.log("WidgetTracker script loaded successfully");
    setTrackerLoaded(true);
  };

  return (
    <>
      {mounted && (
        <Script
          id="widget-tracker-script"
          src="/tracking.js"
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
          onError={() => {
            console.error("Failed to load WidgetTracker script");
          }}
        />
      )}
    </>
  );
};

export default Tracker;
