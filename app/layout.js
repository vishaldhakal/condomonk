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
import Tracker from "@/components/Tracker";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata = {
  metadataBase: new URL("https://condomonk.ca"),
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
      </head>
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
        {/* <Tracker siteId="ABC-123" /> */}
        <Navbar cities={cities}></Navbar>
        <Providers>
          <GoogleAnalytics />
          {children}
        </Providers>
        <Footer cities={cities}></Footer>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-BZlP8y3y1aP5dJt6z/74ukidT+PiZCzV5u5F5+1OW2F0k0yGBGvxXuVEvaO3dPbi"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
