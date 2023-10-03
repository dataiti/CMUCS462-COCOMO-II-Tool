import React from "react";
import Label from "./Label";
import { getDecimal } from "../utils/fn";

const ResultItem = ({ label = "", result = 0, unit }) => {
  return (
    <div className="flex items-center gap-5 text-base font-bold">
      <Label label={label} className="font-bold" />
      <span> = </span>
      <div className="flex items-center gap-3">
        <p className="text-lg font-bold">{getDecimal(Number(result))}</p>
        <span className="text-sm font-semibold text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

export default ResultItem;
