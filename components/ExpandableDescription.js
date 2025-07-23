"use client";

import { useState } from "react";

export default function ExpandableDescription({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {/* Mobile: Clamp to 3 lines unless expanded */}
      <div
        className={`text-gray-600  md:line-clamp-none ${
          expanded ? "line-clamp-none" : "line-clamp-3"
        }`}
      >
        {children}
      </div>
      {/* Toggle button only on mobile */}
      <div className="block md:hidden text-center">
        <button
          className="text-blue-600 font-medium mt-1 focus:outline-none "
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "See less" : "See more"}
        </button>
      </div>
    </div>
  );
}
