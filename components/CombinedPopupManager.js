// components/CombinedPopupManager.js
"use client";
import { useState, useEffect } from "react";
import CityPopup from "./CityPopup";
import ImagePopup from "./ImagePopup";
import { LEAD_FOLLOWUP_EVENT } from "@/helpers/leadFollowUp";

const NEXT_POPUP_DELAY = 1000; // gap after the visitor closes one popup
const BUSY_RECHECK_DELAY = 400; // how often to re-check while a form is open
const AFTER_BUSY_DELAY = 800; // breathing room once that form has closed

// True while another modal (contact form dialog, Quick Preferences, ...) is
// open. Showing a popup on top of one leaves its close button unclickable,
// because open dialogs disable pointer events on everything outside them.
const isAnotherModalOpen = () => {
  if (typeof document === "undefined") return false;
  if (document.body.style.pointerEvents === "none") return true;
  return Boolean(
    document.querySelector(
      '[role="dialog"][data-state="open"], [role="alertdialog"][data-state="open"], [role="dialog"][aria-modal="true"]',
    ),
  );
};

const CombinedPopupManager = ({ cityName }) => {
  const [popupSequence, setPopupSequence] = useState([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  // Set once the visitor submits any inquiry: no more popups on this page
  const [isFinished, setIsFinished] = useState(false);

  // Compare city names by slug so "richmond-hill" matches "Richmond Hill"
  const toSlug = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

  // Preload images function
  const preloadImages = (imageUrls) => {
    return Promise.all(
      imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => resolve(url); // Still resolve to not block the popup
          img.src = url;
        });
      }),
    );
  };

  useEffect(() => {
    let cancelled = false;

    setPopupSequence([]);
    setCurrentPopupIndex(0);
    setIsVisible(false);
    setIsFinished(false);

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
        const citySlug = toSlug(cityName);

        const matchingCityPopup = cityPopups.find((popup) => {
          if (!popup.show_popup) return false;
          const cities = Array.isArray(popup.popupCity)
            ? popup.popupCity
            : [popup.popupCity];
          return cities.some((city) => toSlug(city?.name) === citySlug);
        });

        const matchingImagePopup = imagePopups.find(
          (popup) => popup.show_popup && toSlug(popup.city?.name) === citySlug,
        );

        // Preload images before setting up popups
        if (matchingImagePopup && matchingImagePopup.image) {
          await preloadImages([matchingImagePopup.image]);
        }
        if (cancelled) return;

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
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    if (cityName) {
      fetchAllPopupData();
    }

    return () => {
      cancelled = true;
    };
  }, [cityName]);

  // Show the current popup after its delay, but never on top of another modal:
  // wait until the visitor has closed whatever form they are in.
  useEffect(() => {
    const popup = popupSequence[currentPopupIndex];
    if (!popup || isVisible || isFinished) return;

    let timer;
    let wasBusy = false;

    const tryShow = () => {
      if (isAnotherModalOpen()) {
        wasBusy = true;
        timer = setTimeout(tryShow, BUSY_RECHECK_DELAY);
        return;
      }
      if (wasBusy) {
        wasBusy = false;
        timer = setTimeout(tryShow, AFTER_BUSY_DELAY);
        return;
      }
      setIsVisible(true);
    };

    timer = setTimeout(
      tryShow,
      currentPopupIndex === 0 ? popup.delay : NEXT_POPUP_DELAY,
    );

    return () => clearTimeout(timer);
  }, [popupSequence, currentPopupIndex, isVisible, isFinished]);

  // Any submitted inquiry on the page (this popup or another form) ends the sequence
  useEffect(() => {
    const handleLeadSubmitted = () => {
      setIsVisible(false);
      setIsFinished(true);
    };
    window.addEventListener(LEAD_FOLLOWUP_EVENT, handleLeadSubmitted);
    return () =>
      window.removeEventListener(LEAD_FOLLOWUP_EVENT, handleLeadSubmitted);
  }, []);

  const handlePopupClose = (options) => {
    setIsVisible(false);

    // Visitor just submitted: Quick Preferences takes over, skip further popups
    if (options?.submitted) {
      setIsFinished(true);
      return;
    }

    // Dismissed: move on to the next popup in the sequence, if any
    setCurrentPopupIndex((index) => index + 1);
  };

  const currentPopup = popupSequence[currentPopupIndex];

  // Don't render anything if no popups are left to show
  if (!currentPopup || isFinished) {
    return null;
  }

  return (
    <>
      {currentPopup.type === "city" ? (
        <CityPopup
          cityName={cityName}
          popupData={currentPopup.data}
          showPopup={isVisible}
          onClose={handlePopupClose}
        />
      ) : (
        <ImagePopup
          cityName={cityName}
          popupData={currentPopup.data}
          showPopup={isVisible}
          onClose={handlePopupClose}
        />
      )}
    </>
  );
};

export default CombinedPopupManager;
