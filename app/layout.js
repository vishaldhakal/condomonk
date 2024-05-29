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

async function getCities() {
  const res = await fetch("https://api.condomonk.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getCitiesandProjects() {
  const res = await fetch("https://api.condomonk.ca/api/all-precons", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function RootLayout({ children }) {
  let cities = await getCities();
  let dropdown_cities = await getCitiesandProjects();
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

        <Navbar cities={cities} dropdown_cities={dropdown_cities}></Navbar>
        <Providers>
          <GoogleAnalytics />
          {children}
        </Providers>
        <Footer cities={cities}></Footer>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-BZlP8y3y1aP5dJt6z/74ukidT+PiZCzV5u5F5+1OW2F0k0yGBGvxXuVEvaO3dPbi"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
