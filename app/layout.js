import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./icons.css";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import GoogleAnalytics from "./GoogleAnalytics";
import CommunityPopup from "@/components/CommunityPopup";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Montserrat } from "next/font/google";
import { Providers } from "./providers";
import { allcities } from "@/datas/cities";
import LoadingOverlay from "@/components/LoadingOverlay";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata = {
  alternates: {
    canonical: `https://condomonk.ca/`,
  },
  title: "Pre Construction Homes for Sale in Canada",
  description:
    "Find the latest Pre Construction homes for sale in Canada with the Canada's most user-friendly pre construction portal. Search new homes to buy from leading estate marketplace in Canada.",
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  category: "real estate",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  let cities = allcities;
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
        ></script>
        <Script id="analytics" strategy="afterInteractive">
          {`
            (function() {
              const TRACKING_URL = 'https://analytics.homebaba.ca/api/track/';
              const SITE_ID = 'd0e45564-2d52-4980-89be-5c3859ba1642';
              let visitorId = localStorage.getItem('visitorId');

              function shouldTrack() {
                return !!localStorage.getItem('visitorId');
              }

              function track(eventType, data) {
                if (!shouldTrack()) return;
                const commonData = {
                  visitor_id: visitorId,
                  user_agent: navigator.userAgent,
                  language: navigator.language,
                  screen_resolution: \`\${window.screen.width}x\${window.screen.height}\`,
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                };
                fetch(TRACKING_URL, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    site_id: SITE_ID,
                    event_type: eventType,
                    ...commonData,
                    ...data
                  })
                });
              }

              // Track page views for identified users
              function trackPageView() {
                if (shouldTrack()) {
                  track('Viewed Page', {
                    page_title: document.title,
                    page_url: window.location.href,
                    page_referrer: document.referrer || null
                  });
                }
              }

              // Track initial page load
              trackPageView();

              // Track page views on route changes (for SPAs)
              let lastUrl = window.location.href;

              // Create a new MutationObserver instance
              const observer = new MutationObserver(function(mutations) {
                if (window.location.href !== lastUrl) {
                  lastUrl = window.location.href;
                  // Wait for title to be updated
                  setTimeout(trackPageView, 100);
                }
              });

              // Start observing the document with the configured parameters
              observer.observe(document, {
                subtree: true,
                childList: true
              });

              // Track form submissions
              document.addEventListener('submit', function(e) {
                const form = e.target;
                const formData = new FormData(form);
                const data = {};
                let hasEmail = false;

                formData.forEach((value, key) => {
                  data[key] = value;
                  if (key === 'email') {
                    hasEmail = true;
                    localStorage.setItem('visitorId', btoa(value));
                    visitorId = btoa(value);
                  }
                });

                if (hasEmail) {
                  track('Form Submission', {
                    form_data: data,
                    form_id: form.id || 'unknown',
                    page_url: window.location.href,
                    page_referrer: document.referrer || null
                  });
                }
              });
            })();
          `}
        </Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={montserrat.className}>
        <LoadingOverlay />
        <NextTopLoader
          color="#32a953"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #32a953,0 0 5px #32a953"
        />
        {/* <Tracker siteId="ABC-123" /> */}
        <Navbar cities={cities}></Navbar>
        <Providers>
          <GoogleAnalytics />
          {children}
        </Providers>
        <Footer cities={cities}></Footer>
        <CommunityPopup />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-BZlP8y3y1aP5dJt6z/74ukidT+PiZCzV5u5F5+1OW2F0k0yGBGvxXuVEvaO3dPbi"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
