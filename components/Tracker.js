// components/Tracker.js
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const Tracker = ({ siteId }) => {
  const pathname = usePathname();
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

    const trackFormSubmission = (event) => {
      const form = event.target;
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());

      window.customTracker("send", "form_submission", {
        formId: form.id || "unknown",
        formData: formObject,
      });
    };
    document.addEventListener("submit", trackFormSubmission);

    return () => {
      document.removeEventListener("submit", trackFormSubmission);
    };
  }, [siteId, mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Send pageview on route change
    const fullPath = pathname;
    window.customTracker("send", "pageview", fullPath);
  }, [pathname, mounted]);

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
