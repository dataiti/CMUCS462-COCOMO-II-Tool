import React from "react";

const Label = ({ className = "", htmlFor, label = "", isTitle = false }) => {
  return (
    <>
      {isTitle ? (
        <label
          className={`font-bold text-lg text-black ${className}`}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      ) : (
        <label
          className={`font-bold text-base text-emerald-700 ${className}`}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
    </>
  );
};

export default Label;
