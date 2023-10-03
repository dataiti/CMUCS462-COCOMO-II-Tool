import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PDFDocument from "../components/PDFDocument";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import {
  constructionSelect,
  getDetailConstructionThunkAction,
} from "../redux/features/constructionSlice";
import { authSelect } from "../redux/features/authSlice";
import { Button, Label, Loading, Title } from "../components";
import { covertToDate, getDecimal, getFactorValue } from "../utils/fn";
import { FaFileExport, RiFileEditFill } from "../utils/icon";
import AcquisitionDistributeTable from "../components/AcquisitionDistributeTable";
import SoftwareEffortDistributeTable from "../components/SoftwareEffortDistributeTable";

const DetailConstruction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [htmlData, setHtmlData] = useState();
  const [isViewPDF, setIsViewPDF] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { construction } = useSelector(constructionSelect);
  const { userInfo } = useSelector(authSelect);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchGetConstructionAPI = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          getDetailConstructionThunkAction({
            userId: userInfo?._id,
            constructionId: id,
          })
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchGetConstructionAPI();
  }, [userInfo?._id, id, dispatch]);

  return (
    <div className="flex flex-col gap-3 px-10 py-2 bg-slate-200/80 pb-10">
      {isLoading && <Loading />}
      <Title />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Label label="Size Type: " isTitle />
            <Label
              label={`${
                construction?.sizeType === "SLOC"
                  ? "Source Lines of Code"
                  : "Function Points"
              }`}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label label="Project Name: " isTitle />
            <Label label={construction?.projectName} />
          </div>
          <div className="flex items-center gap-4">
            <Label label="Created At: " isTitle />
            <Label label={covertToDate(construction?.createdAt)} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Results" isTitle />
          <Label
            label="Software Development (Elaboration and Construction)"
            isTitle
          />
          <table className="w-full text-sm text-left text-gray-400 cursor-pointer border rounded-lg">
            <thead className="text-black font-bold text-base bg-slate-300">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 border border-gray-400  text-center"
                >
                  Effort
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-gray-400  text-center"
                >
                  Schedule
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-gray-400  text-center"
                >
                  Cost
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-gray-400  text-center"
                >
                  Total Equivalent Size
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-gray-400  text-center"
                >
                  Effort Adjustment Factor (EAF)
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border border-gray-400 hover:bg-gray-100 ">
                <td className="px-6 text-lg py-4 border border-gray-400  text-center text-yellow-600 font-bold">
                  {getDecimal(Number(construction?.softwareEffort))}
                </td>
                <td className="px-6 text-lg py-4 border border-gray-400  text-center text-yellow-600 font-bold">
                  {getDecimal(Number(construction?.softwareSchedule))}
                </td>
                <td className="px-6 py-4 border border-gray-400  text-center text-yellow-600 font-bold text-lg">
                  {getDecimal(Number(construction?.cost))}
                </td>
                <td className="px-6 text-lg py-4 border border-gray-400  text-center text-yellow-600 font-bold">
                  {getDecimal(Number(construction?.totalEquivalentSize))}
                </td>
                <td className="px-6 text-lg text-yellow-600 font-bold py-4 border border-gray-400  text-center">
                  {getDecimal(Number(construction?.softwareEAF))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Label label="Acquisition Phase Distribution" isTitle />
          <AcquisitionDistributeTable result={construction} />
        </div>
        <div>
          <Label
            label="Software Effort Distribution for RUP/MBASE (Person-Months)"
            isTitle
          />
          <SoftwareEffortDistributeTable result={construction} />
        </div>
        <p className="w-full h-[2px] bg-slate-900 rounded-full"></p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-sm">
            <Label label="Software Scale Drivers" isTitle />
            <div className="flex items-center justify-between">
              <Label label="Precedentedness" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.PREC} -{" "}
                {getFactorValue({ PREC: construction?.PREC })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Development Flexibility" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.FLEX} -{" "}
                {getFactorValue({ FLEX: construction?.FLEX })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Architecture / Risk Resolution	" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.RESL} -{" "}
                {getFactorValue({ RESL: construction?.RESL })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Team Cohesion	Nominal" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.TEAM} -{" "}
                {getFactorValue({ TEAM: construction?.TEAM })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Process Maturity" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.PMAT} -{" "}
                {getFactorValue({ PMAT: construction?.PMAT })} (N)
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-sm">
            <Label label="Software Cost Drivers Product" isTitle />
            <div className="flex items-center justify-between">
              <Label label="Required Software Reliability" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.RELY} -{" "}
                {getFactorValue({ RELY: construction?.RELY })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Data Base Size" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.DATA} -{" "}
                {getFactorValue({ DATA: construction?.DATA })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Product Complexity" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.CPLX} -{" "}
                {getFactorValue({ CPLX: construction?.CPLX })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Developed for Reusability" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.RUSE} -{" "}
                {getFactorValue({ RUSE: construction?.RUSE })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Documentation Match to Lifecycle Needs" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.DOCU} -{" "}
                {getFactorValue({ DOCU: construction?.DOCU })} (N)
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-sm">
            <Label label="Personnel" isTitle />
            <div className="flex items-center justify-between">
              <Label label="Analyst Capability" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.ACAP} -{" "}
                {getFactorValue({ ACAP: construction?.ACAP })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Programmer Capability" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.PCAP} -{" "}
                {getFactorValue({ PCAP: construction?.PCAP })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Personnel Continuity" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.PCON} -{" "}
                {getFactorValue({ PCON: construction?.PCON })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Application Experience" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.AEXP} -{" "}
                {getFactorValue({ AEXP: construction?.AEXP })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Platform Experience" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.PEXP} -{" "}
                {getFactorValue({ PEXP: construction?.PEXP })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Language and Toolset Experience" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold whitespace-nowrap">
                {construction?.LTEX} -{" "}
                {getFactorValue({ LTEX: construction?.LTEX })} (N)
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-sm">
            <Label label="Platform" isTitle />
            <div className="flex items-center justify-between">
              <Label label="Time Constraint" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.TIME} -{" "}
                {getFactorValue({ TIME: construction?.TIME })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Storage Constraint" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.STOR} -{" "}
                {getFactorValue({ STOR: construction?.STOR })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Platform Volatility" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.PVOL} -{" "}
                {getFactorValue({ PVOL: construction?.PVOL })} (N)
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-sm">
            <Label label="Project" isTitle />
            <div className="flex items-center justify-between">
              <Label label="Use of Software Tools" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.TOOL} -{" "}
                {getFactorValue({ TOOL: construction?.TOOL })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Multisite Development" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold">
                {construction?.SITE} -{" "}
                {getFactorValue({ SITE: construction?.SITE })} (N)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label label="Required Development Schedule	" />
              <p className="bg-slate-100 text-yellow-600 rounded-md border px-4 py-1 text-sm font-bold whitespace-nowrap">
                {construction?.SCED} -{" "}
                {getFactorValue({ SCED: construction?.SCED })} (N)
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            primary
            leftIcon={<RiFileEditFill size={18} />}
            className="px-8 bg-sky-900 hover:bg-sky-800"
            to={`/update-construction/${id}`}
          >
            Start Edit
          </Button>
          <Button
            primary
            leftIcon={<FaFileExport size={18} />}
            className="px-8 bg-rose-900 hover:bg-rose-800"
            onClick={() => setIsViewPDF(!isViewPDF)}
          >
            View Export .PDF
          </Button>
          <div dangerouslySetInnerHTML={{ __html: htmlData }} />
        </div>
        {isViewPDF && (
          <div className="overflow-hidden rounded-lg">
            <PDFViewer width={"100%"} height={1200}>
              <PDFDocument data={construction} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailConstruction;
