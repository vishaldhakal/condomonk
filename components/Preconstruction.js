import Link from "next/link";

export default function RealEstateLinks({ city = "Ontario" }) {
  // List of cities to display in the grid
  const cities = [
    "Ajax",
    "Barrie",
    "Belleville",
    "Brampton",
    "Brant",
    "Brantford",
    "Burlington",
    "Cambridge",
    "Etobicoke",
    "Guelph",
    "Hamilton",
    "Kingston",
    "Kitchener",
    "London",
    "Markham",
    "Milton",
  ];

  // Function to generate the correct URL based on city
  const getUrl = (path) => {
    if (city.toLowerCase() === "ontario") {
      return `#/${path}`;
    }
    return `#/${city.toLowerCase()}/${path}`;
  };

  return (
    <></>
  );
}
