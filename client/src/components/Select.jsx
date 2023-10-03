import React from "react";

const Select = ({ children, onChange, field }) => {
  return (
    <select
      className="border border-gray-300 rounded-md outline-none bg-gray-100 px-3 py-1 text-sm"
      onChange={onChange}
      {...field}
    >
      {children}
    </select>
  );
};

export default Select;
