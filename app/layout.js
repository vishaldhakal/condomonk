import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./icons.css";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import GoogleAnalytics from "./GoogleAnalytics";

import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Montserrat } from "next/font/google";
import { Providers } from "./providers";
import { allcities } from "@/datas/cities";

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
      <body className={montserrat.className}>
        <NextTopLoader
          color="#FF0000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #00A1FF,0 0 5px #00A1FF"
        />

        <Navbar cities={cities}></Navbar>
        <Providers>
          <GoogleAnalytics />
          {children}
        </Providers>
        <Footer cities={cities}></Footer>
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
{(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
(t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
e.parentNode.insertBefore(t,e);})
(window,"https://widgetbe.com/agent",document,"widgetTracker");
window.widgetTracker("create", "WT-KPVDOHAU");
window.widgetTracker("send", "pageview");
          `,
          }}
        />
        <Script />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-BZlP8y3y1aP5dJt6z/74ukidT+PiZCzV5u5F5+1OW2F0k0yGBGvxXuVEvaO3dPbi"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
