import React from "react";
import { Controller } from "react-hook-form";

const Input = ({
  type = "text",
  className = "",
  name = "",
  control,
  placeholder = "",
  setValue,
}) => {
  const handleChangeInput = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      return;
    }
    if (name === "reusedAA" && inputValue > 8) {
      return;
    }
    setValue(name, inputValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={name === "reusedDM" || name === "reusedCM" ? "0" : ""}
      render={({ field }) => (
        <input
          type={type}
          className={`outline-none border border-gray-300 rounded-md py-1 px-2 ${
            name === "reusedDM" || name === "reusedCM"
              ? "select-none pointer-events-none opacity-50"
              : ""
          }  placeholder:text-sm ${className}`}
          placeholder={placeholder}
          spellCheck={false}
          {...field}
          onChange={handleChangeInput}
        />
      )}
    />
  );
};

export default Input;
