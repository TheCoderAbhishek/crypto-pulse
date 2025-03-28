import React from "react";

function LoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-10 h-10 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-blue-500 border-b-blue-500 border-l-transparent ${
        sizeClasses[size] || sizeClasses.md
      }`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
