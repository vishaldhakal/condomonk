import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./icons.css";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import Providers from "./providers";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata = {
  metadatBase: new URL("https://condomonk.ca"),
  title: "Condomonk",
  description: "Preconstruction condos sales website in Canada",
  keywords: ["condos", "preconstruction", "Canada", "sales"],
  applicationName: "Condomonk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Condomonk",
    description: "Preconstruction condos sales website in Canada",
    url: "https://condomonk.ca",
    siteName: "Condomonk",
    images: [
      {
        url: "https://condomonk.ca/logo.png",
        alt: "Logo",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "real estate",
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

export default async function RootLayout({ children }) {
  let cities = await getCities();
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar cities={cities}></Navbar>
        <Providers>{children}</Providers>
        <Footer cities={cities}></Footer>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
