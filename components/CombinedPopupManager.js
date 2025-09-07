// components/CombinedPopupManager.js
"use client";
import { useState, useEffect } from "react";
import CityPopup from "./CityPopup";
import ImagePopup from "./ImagePopup";

const CombinedPopupManager = ({ cityName }) => {
  const [cityPopupData, setCityPopupData] = useState(null);
  const [imagePopupData, setImagePopupData] = useState(null);
  const [showCityPopup, setShowCityPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupSequence, setPopupSequence] = useState([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Format city name to match API response
  const formatCityName = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  // Preload images function
  const preloadImages = (imageUrls) => {
    return Promise.all(
      imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => resolve(url); // Still resolve to not block the popup
          img.src = url;
        });
      })
    );
  };

  useEffect(() => {
    const fetchAllPopupData = async () => {
      try {
        // Fetch both types of popups
        const [cityResponse, imageResponse] = await Promise.all([
          fetch("https://admin.homebaba.ca/api/popups/"),
          fetch("https://admin.homebaba.ca/api/image-popups/"),
        ]);

        let cityPopups = [];
        let imagePopups = [];

        if (cityResponse.ok) {
          cityPopups = await cityResponse.json();
        }
        if (imageResponse.ok) {
          imagePopups = await imageResponse.json();
        }

        // Find matching popups for the current city
        const matchingCityPopup = cityPopups.find((popup) => {
          if (!popup.show_popup) return false;
          const cities = Array.isArray(popup.popupCity)
            ? popup.popupCity
            : [popup.popupCity];
          return cities.some(
            (city) =>
              city.name.toLowerCase() === formatCityName(cityName).toLowerCase()
          );
        });

        const matchingImagePopup = imagePopups.find((popup) => {
          if (!popup.show_popup) return false;
          return (
            popup.city.name.toLowerCase() ===
            formatCityName(cityName).toLowerCase()
          );
        });

        // Collect all image URLs for preloading
        const imageUrls = [];
        if (matchingImagePopup && matchingImagePopup.image) {
          imageUrls.push(matchingImagePopup.image);
        }

        // Preload images before setting up popups
        if (imageUrls.length > 0) {
          await preloadImages(imageUrls);
        }
        setImagesPreloaded(true);

        // Set popup data
        setCityPopupData(matchingCityPopup);
        setImagePopupData(matchingImagePopup);

        // Determine popup sequence
        const sequence = [];
        if (matchingCityPopup) {
          sequence.push({ type: "city", data: matchingCityPopup, delay: 2000 });
        }
        if (matchingImagePopup) {
          sequence.push({
            type: "image",
            data: matchingImagePopup,
            delay: 5000,
          });
        }

        setPopupSequence(sequence);

        // Start the popup sequence if there are popups to show
        if (sequence.length > 0) {
          startPopupSequence(sequence);
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    if (cityName) {
      fetchAllPopupData();
    }
  }, [cityName]);

  const startPopupSequence = (sequence) => {
    if (sequence.length === 0) return;

    // Show first popup after initial delay
    const firstPopup = sequence[0];
    setTimeout(() => {
      if (firstPopup.type === "city") {
        setShowCityPopup(true);
      } else {
        setShowImagePopup(true);
      }
      setCurrentPopupIndex(0);
    }, firstPopup.delay);

    // Schedule subsequent popups with 5-second gaps (only if there are multiple popups)
    if (sequence.length > 1) {
      sequence.forEach((popup, index) => {
        if (index > 0) {
          setTimeout(() => {
            // Close previous popup
            if (sequence[index - 1].type === "city") {
              setShowCityPopup(false);
            } else {
              setShowImagePopup(false);
            }

            // Show current popup
            setTimeout(() => {
              if (popup.type === "city") {
                setShowCityPopup(true);
              } else {
                setShowImagePopup(true);
              }
              setCurrentPopupIndex(index);
            }, 500); // Small delay between closing and opening
          }, firstPopup.delay + index * 5000); // 5 second intervals
        }
      });
    }
  };

  const handleCityPopupClose = () => {
    setShowCityPopup(false);

    // If there are more popups in sequence, show the next one
    if (currentPopupIndex < popupSequence.length - 1) {
      const nextPopup = popupSequence[currentPopupIndex + 1];
      setTimeout(() => {
        if (nextPopup.type === "city") {
          setShowCityPopup(true);
        } else {
          setShowImagePopup(true);
        }
        setCurrentPopupIndex(currentPopupIndex + 1);
      }, 1000); // 1 second delay before showing next popup
    }
  };

  const handleImagePopupClose = () => {
    setShowImagePopup(false);

    // If there are more popups in sequence, show the next one
    if (currentPopupIndex < popupSequence.length - 1) {
      const nextPopup = popupSequence[currentPopupIndex + 1];
      setTimeout(() => {
        if (nextPopup.type === "city") {
          setShowCityPopup(true);
        } else {
          setShowImagePopup(true);
        }
        setCurrentPopupIndex(currentPopupIndex + 1);
      }, 1000); // 1 second delay before showing next popup
    }
  };

  // Don't render anything if no popups are available
  if (popupSequence.length === 0) {
    return null;
  }

  return (
    <>
      {/* City Popup */}
      {cityPopupData && (
        <CityPopup
          cityName={cityName}
          popupData={cityPopupData}
          showPopup={showCityPopup}
          onClose={handleCityPopupClose}
        />
      )}

      {/* Image Popup */}
      {imagePopupData && (
        <ImagePopup
          cityName={cityName}
          popupData={imagePopupData}
          showPopup={showImagePopup}
          onClose={handleImagePopupClose}
        />
      )}
    </>
  );
};

export default CombinedPopupManager;
