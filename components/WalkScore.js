"use client";
import React, { useEffect, useRef } from "react";

const WalkScore = ({ address, width = 690, height = 525, format = "wide" }) => {
  const walkScoreRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!address || scriptLoaded.current) return;

    // Set up WalkScore parameters
    window.ws_wsid = "gbb8637d6fd784edba7638a0aad134645";
    window.ws_address = address;
    window.ws_format = format;
    window.ws_width = width;
    window.ws_height = height;
    window.ws_hide_footer = true;

    // Create and load the WalkScore script
    const script = document.createElement("script");
    script.src = "https://www.walkscore.com/tile/show-walkscore-tile.php";
    script.async = true;
    script.id = "walkscore-script";

    // Only append the script if it hasn't been loaded yet
    if (!document.getElementById("walkscore-script")) {
      document.body.appendChild(script);
      scriptLoaded.current = true;
    }

    return () => {
      // Cleanup if component unmounts
      if (walkScoreRef.current) {
        walkScoreRef.current.innerHTML = "";
      }
    };
  }, [address, width, height, format]);

  return (
    <div className="mb-8 w-full">
      <style>{`
        #ws-walkscore-tile {
          position: relative;
          text-align: left;
          min-height: ${height}px;
          width: 100%;
          clear: both;
          margin-bottom: 16px;
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
