import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./blog.css";

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
    <>
      {/* <Navbar cities={cities}></Navbar> */}
      {children}
      <Footer cities={cities}></Footer>
    </>
  );
}
