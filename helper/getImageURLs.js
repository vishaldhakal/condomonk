import { PILLAR9_BASEURL } from "@/app/_resale-api";
import {
  albertaListings,
  residential,
} from "@/app/_resale-api/routes/fetchRoutes";

export const generateImageURLs = (id) => {
  const images = [];

  for (let i = 1; i <= 10; i++) {
    const mapObj = {
      MLS: id,
      index: i,
    };

    const imgSrc = albertaListings.photos.replace(
      /MLS|index/gi,
      function (matched) {
        return mapObj[matched];
      }
    );

    images.push(imgSrc);
  }

  return images;
};
