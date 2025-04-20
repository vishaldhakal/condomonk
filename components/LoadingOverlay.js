"use client";
import { useState, useEffect } from "react";

const LoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    document.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleComplete);

    return () => {
      document.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleComplete);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#32a953]"></div>
    </div>
  );
};

export default LoadingOverlay;
