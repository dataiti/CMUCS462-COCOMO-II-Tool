import React from "react";
import { getDecimal } from "../utils/fn";

const SoftwareEffortDistributeTable = ({ result = {} }) => {
  return (
    <div className="w-[700px] ">
      <table className="w-full text-sm text-center font-bold cursor-pointer rounded-md">
        <thead className="text-sm border-b text-emerald-700 bg-amber-50">
          <tr>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Phase/Activity
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Inception
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Elaboration
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Construction
            </th>
            <th scope="col" className="border-2 border-gray-500 px-2 py-2">
              Transition
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              Management
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.managementInception))}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(Number(result?.managementElaboration))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.managementConstruction))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              {getDecimal(Number(result?.managementTransition))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              Environment/CM{" "}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.environmentPerCMInception))}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(Number(result?.environmentPerCMElaboration))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.environmentPerCMConstruction))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              {getDecimal(Number(result?.environmentPerCMTransition))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              Requirements
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.requirementsInception))}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(Number(result?.requirementsElaboration))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.requirementsConstruction))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              {getDecimal(Number(result?.requirementsTransition))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              Design
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.designInception))}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(Number(result?.designElaboration))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.designConstruction))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              {getDecimal(Number(result?.designTransition))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              Implementation
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.implementationInception))}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(Number(result?.implementationElaboration))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.implementationConstruction))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              {getDecimal(Number(result?.implementationTransition))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              Assessment
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.assessmentInception))}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(Number(result?.assessmentElaboration))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.assessmentConstruction))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              {getDecimal(Number(result?.assessmentTransition))}
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-100 ">
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              Deployment
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.deploymentInception))}
            </td>
            <td className="border-2 border-gray-500 px-6 py-2 text-gray-500 text-sm">
              {getDecimal(Number(result?.deploymentElaboration))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm py-2 text-gray-500">
              {getDecimal(Number(result?.deploymentConstruction))}
            </td>
            <td className="border-2 border-gray-500 px-6 text-sm text-gray-500 py-2">
              {getDecimal(Number(result?.deploymentTransition))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SoftwareEffortDistributeTable;
