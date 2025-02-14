"use client";
import React, { useEffect, useRef } from "react";

const WalkScore = ({ address, width = 690, height = 525, format = "wide" }) => {
  const walkScoreRef = useRef(null);

  useEffect(() => {
    if (address) {
      // Append the Walk Score widget script dynamically
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://www.walkscore.com/tile/show-walkscore-tile.php";
      script.async = true;

      // Walk Score parameters
      window.ws_wsid = "gbb8637d6fd784edba7638a0aad134645"; // Replace with your API key
      window.ws_address = address;
      window.ws_format = format;
      window.ws_width = width;
      window.ws_height = height;

      // Append script to WalkScore div
      if (walkScoreRef.current) {
        walkScoreRef.current.innerHTML = ""; // Clear previous widget
        walkScoreRef.current.appendChild(script);
      }
    }
  }, [address, width, height, format]);

  return (
    <div>
      <style>{`
        #ws-walkscore-tile {
          position: relative;
          text-align: left;
        }
        #ws-walkscore-tile * {
          float: none;
        }
      `}</style>
      <div id="ws-walkscore-tile" ref={walkScoreRef}></div>
    </div>
  );
};

export default WalkScore;
