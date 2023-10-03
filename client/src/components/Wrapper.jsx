import React from "react";

const Wrapper = ({ children, className = "" }) => {
  return (
    <div className={`p-2 bg-white shadow-sm border rounded-md ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
