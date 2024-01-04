const PreconSchema = (listing) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: listing.project_name,
    image:
      (listing.image && listing.image[0] && listing.image[0].image) ||
      "/noimage.webp",
    description:
      listing.project_name +
      " is a brand new Pre-construction located at  " +
      listing.project_address +
      " , " +
      listing.city.name +
      " with great features " +
      " and in high demand all over Canada.",
    brand: listing.developer.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "20",
    },
    offers: {
      "@type": "AggregateOffer",
      url: `https://condomonk.ca/${listing.city.slug}/${listing.slug}`,
      priceCurrency: "CAD",
      lowPrice: listing.price_starting_from || "0",
      highPrice: listing.price_to || "0",
    },
  };
};

export default PreconSchema;
