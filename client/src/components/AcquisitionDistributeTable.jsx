import React from "react";
import { getDecimal, getDecimalInt } from "../utils/fn";

const AcquisitionDistributeTable = ({ result = {} }) => {
  return (
    <div className="w-[600px] ">
      <table className="w-full text-sm text-center font-bold text-gray-400 cursor-pointer rounded-md">
        <thead className="text-sm border-b text-emerald-700 bg-amber-50">
          <tr>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Phase
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Effort (Person-months)
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Schedule (Months)
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Average Staff
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Cost (Dollars)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b  hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-red-500 ">
              Inception
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.inceptionEffort)}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(result?.inceptionSchedule)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.inceptionAverageStaff)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              $ {getDecimalInt(Number(result?.inceptionCost))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-orange-700">
              Elaboration
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.elaborationEffort)}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(result?.elaborationSchedule)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.elaborationAverageStaff)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              $ {getDecimalInt(Number(result?.elaborationCost))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-blue-600">
              Construction
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.constructionEffort)}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(result?.constructionSchedule)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.constructionAverageStaff)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              $ {getDecimalInt(Number(result?.constructionCost))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-green-600">
              Transition
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.transitionEffort)}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(result?.transitionSchedule)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(result?.transitionAverageStaff)}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              $ {getDecimalInt(Number(result?.transitionCost))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AcquisitionDistributeTable;
