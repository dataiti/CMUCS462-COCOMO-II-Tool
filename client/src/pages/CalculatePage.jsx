import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  personnel,
  softwareCostDriversProduct,
  softwareScaleDrivers,
  platform,
  project,
  softwareSize,
  languageFactor,
} from "../utils/constant";
import { authSelect } from "../redux/features/authSlice";
import {
  calculateFunctionPointsThunkAction,
  calculateSourceLinesOfCodeThunkAction,
  calculateSelect,
  clearResult,
} from "../redux/features/caculateSlice";
import {
  Factorial,
  Label,
  Button,
  Input,
  ResultItem,
  Loading,
  Wrapper,
  Select,
  Modal,
  Title,
} from "../components";
import LoginPage from "./LoginPage";
import { saveConstructionThunkAction } from "../redux/features/constructionSlice";
import { toast } from "react-toastify";
import AcquisitionDistributeTable from "../components/AcquisitionDistributeTable";
import SoftwareEffortDistributeTable from "../components/SoftwareEffortDistributeTable";
import VerticalBarChart from "../components/VerticalBarChart";

const projectNameSchema = yup.object({
  projectName: yup.string().required("Required !"),
});

const CalculatePage = () => {
  const [sizingMethod, setSizingMethod] = useState("SLOC");
  const [resultState, setResultState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn } = useSelector(authSelect);

  const dispatch = useDispatch();
  const { result } = useSelector(calculateSelect);
  const { userInfo } = useSelector(authSelect);

  const { control, reset, getValues, setValue } = useForm({
    defaultValues: {
      projectName: "",
      language: "basic",
      functionPoints: "",
      newSize: "",
      reusedSize: "",
      reusedIM: "",
      reusedAA: "",
      PREC: "nominal",
      FLEX: "nominal",
      RESL: "nominal",
      TEAM: "nominal",
      PMAT: "nominal",
      RELY: "nominal",
      DATA: "nominal",
      CPLX: "nominal",
      RUSE: "nominal",
      DOCU: "nominal",
      ACAP: "nominal",
      PCAP: "nominal",
      PCON: "nominal",
      AEXP: "nominal",
      PEXP: "nominal",
      LTEX: "nominal",
      TIME: "nominal",
      STOR: "nominal",
      PVOL: "nominal",
      TOOL: "nominal",
      SITE: "nominal",
      SCED: "nominal",
      softwareMaintenance: "Off",
      softwareLaborCostPerPM: "",
    },
    mode: "onChange",
    resolver: yupResolver(projectNameSchema),
  });

  useEffect(() => {
    reset();
    dispatch(clearResult());
  }, []);

  useEffect(() => {
    if (result) {
      setResultState({
        softwareEAF: result?.softwareEAF,
        softwareEffort: result?.softwareEffort,
        softwareSchedule: result?.softwareSchedule,
        totalEquivalentSize: result?.totalEquivalentSize,
        cost: result?.cost,
        inceptionEffort: result?.inceptionEffort,
        inceptionSchedule: result?.inceptionSchedule,
        inceptionAverageStaff: result?.inceptionAverageStaff,
        inceptionCost: result?.inceptionCost,
        elaborationEffort: result?.elaborationEffort,
        elaborationSchedule: result?.elaborationSchedule,
        elaborationAverageStaff: result?.elaborationAverageStaff,
        elaborationCost: result?.elaborationCost,
        constructionEffort: result?.constructionEffort,
        constructionSchedule: result?.constructionSchedule,
        constructionAverageStaff: result?.constructionAverageStaff,
        constructionCost: result?.constructionCost,
        transitionEffort: result?.transitionEffort,
        transitionSchedule: result?.transitionSchedule,
        transitionAverageStaff: result?.transitionAverageStaff,
        transitionCost: result?.transitionCost,

        managementInception: result?.managementInception,
        environmentPerCMInception: result?.environmentPerCMInception,
        requirementsInception: result?.requirementsInception,
        designInception: result?.designInception,
        implementationInception: result?.implementationInception,
        assessmentInception: result?.assessmentInception,
        deploymentInception: result?.deploymentInception,

        managementElaboration: result?.managementElaboration,
        environmentPerCMElaboration: result?.environmentPerCMElaboration,
        requirementsElaboration: result?.requirementsElaboration,
        designElaboration: result?.designElaboration,
        implementationElaboration: result?.implementationElaboration,
        assessmentElaboration: result?.assessmentElaboration,
        deploymentElaboration: result?.deploymentElaboration,

        managementConstruction: result?.managementConstruction,
        environmentPerCMConstruction: result?.environmentPerCMConstruction,
        requirementsConstruction: result?.requirementsConstruction,
        designConstruction: result?.designConstruction,
        implementationConstruction: result?.implementationConstruction,
        assessmentConstruction: result?.assessmentConstruction,
        deploymentConstruction: result?.deploymentConstruction,

        managementTransition: result?.managementTransition,
        environmentPerCMTransition: result?.environmentPerCMTransition,
        requirementsTransition: result?.requirementsTransition,
        designTransition: result?.designTransition,
        implementationTransition: result?.implementationTransition,
        assessmentTransition: result?.assessmentTransition,
        deploymentTransition: result?.deploymentTransition,
      });
    }
  }, [result]);

  const handleChangeTypeSizingMethod = (e) => {
    setSizingMethod(e.target.value);
    dispatch(clearResult());
    reset();
  };

  const handleCalculateCocomo = async (e) => {
    try {
      e.preventDefault();
      if (sizingMethod === "SLOC") {
        if (!getValues().newSize) {
          toast.warning("New Size SLOC is Required!");
          return;
        }
      } else if (sizingMethod === "FP") {
        if (!getValues().language) {
          toast.warning("UFP is Required!");
          return;
        }
      }
      if (!getValues().softwareLaborCostPerPM) {
        toast.warning("Software Labor Cost Per PM is Required!");
        return;
      }
      setIsLoading(true);

      let formatData = {
        ...getValues(),
        sizeType: sizingMethod,
      };
      if (sizingMethod === "SLOC") {
        await dispatch(
          calculateSourceLinesOfCodeThunkAction({ data: formatData })
        );
      } else if (sizingMethod === "FP") {
        await dispatch(
          calculateFunctionPointsThunkAction({ data: formatData })
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSaveResult = async (e) => {
    try {
      e.preventDefault();
      if (!getValues().projectName) {
        toast.warning("Project Name is Required!");
        return;
      }
      if (sizingMethod === "SLOC") {
        if (!getValues().newSize) {
          toast.warning("New Size SLOC is Required!");
          return;
        }
      } else if (sizingMethod === "FP") {
        if (!getValues().language) {
          toast.warning("UFP is Required!");
          return;
        }
      }
      if (!getValues().softwareLaborCostPerPM) {
        toast.warning("Software Labor Cost Per PM is Required!");
        return;
      }
      setIsLoading(true);

      let formatData = {
        sizeType: sizingMethod,
        ...getValues(),
        ...resultState,
      };
      const res = await dispatch(
        saveConstructionThunkAction({
          userId: userInfo?._id,
          data: formatData,
        })
      );
      if (res.payload.success) {
        toast.success("Save construction successfullty");
      }
      dispatch(clearResult());
      reset();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleResetConstruction = (e) => {
    e.preventDefault();
    dispatch(clearResult());
    reset();
  };

  return (
    <div className="flex flex-col gap-3 px-10 py-2 pb-10 bg-slate-200/80">
      {isLoading && <Loading />}
      <Title />
      <form className="flex flex-col gap-2" hand>
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-3 flex flex-col gap-2">
                <Label label="Project Name" isTitle />
                <Input
                  type="text"
                  name="projectName"
                  control={control}
                  setValue={setValue}
                />
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-7">
                <Label label="Software Size" isTitle />
                {softwareSize.map((item, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <Label label={item.title} />
                    <Select onChange={handleChangeTypeSizingMethod}>
                      {item.value.map((itemValue, index) => (
                        <option value={itemValue.value} key={index}>
                          {itemValue.key}
                        </option>
                      ))}
                    </Select>
                  </div>
                ))}
              </div>
              {/* <Button primary className="px-8 bg-green-600 hover:bg-green-500">
                Import .CSV
              </Button> */}
            </div>
            {sizingMethod === "SLOC" ? (
              <>
                <div className="grid grid-cols-6 gap-4">
                  <div></div>
                  <Label
                    label="SLOC"
                    className="text-center text-blue-600 underline"
                  />
                  <Label label="% Design Modified" className="text-center" />
                  <Label label="% Code Modified" className="text-center" />
                  <Label
                    label="% Integration Required"
                    className="text-center"
                  />
                  <Label
                    label="Assessment and Assimilation (0% - 8%)"
                    className="text-center"
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <Label label="New" />
                  <Input
                    type="number"
                    name="newSize"
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <Label label="Reuse" />
                  <Input
                    type="number"
                    name="reusedSize"
                    control={control}
                    setValue={setValue}
                  />
                  <Input
                    type="number"
                    name="reusedDM"
                    control={control}
                    setValue={setValue}
                  />
                  <Input
                    type="number"
                    name="reusedCM"
                    control={control}
                    setValue={setValue}
                  />
                  <Input
                    type="number"
                    name="reusedIM"
                    control={control}
                    setValue={setValue}
                  />
                  <Input
                    type="number"
                    name="reusedAA"
                    control={control}
                    setValue={setValue}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-7 gap-4">
                  <div className="col-span-4 flex items-center gap-2">
                    <Label label="Unadjusted Function Points" />
                    <Input
                      type="number"
                      name="functionPoints"
                      control={control}
                      setValue={setValue}
                    />
                  </div>
                  {languageFactor.map((item, index) => (
                    <div
                      className="col-span-2 flex items-center gap-2"
                      key={index}
                    >
                      <Label label={item.title} />
                      <Controller
                        name="language"
                        control={control}
                        setValue={setValue}
                        defaultValue="basic"
                        render={({ field }) => (
                          <Select field={field}>
                            {item.values.map((itemValue, index) => (
                              <option value={itemValue.value} key={index}>
                                {itemValue.key}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Factorial
            factorial={softwareScaleDrivers}
            title=" Software Scale Drivers"
            control={control}
            setValue={setValue}
          />
          <Factorial
            factorial={softwareCostDriversProduct}
            title="Software Cost Drivers Product"
            control={control}
            setValue={setValue}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Factorial
            factorial={personnel}
            title="Personnel"
            control={control}
            setValue={setValue}
          />
          <Factorial
            factorial={platform}
            title="Platform"
            control={control}
            setValue={setValue}
          />
          <Factorial
            factorial={project}
            title="Project"
            control={control}
            setValue={setValue}
          />
        </div>
        <div className="flex flex-col">
          <Label label="Software Labor Rates" isTitle />
          <div className="flex items-center gap-4">
            <Label label="Cost per Person-Month (Dollars)" />
            <Input
              type="number"
              name="softwareLaborCostPerPM"
              control={control}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              primary
              className="px-8 bg-emerald-900 hover:bg-emerald-800"
              onClick={handleCalculateCocomo}
            >
              Calculate
            </Button>
            {isLoggedIn ? (
              <Button
                primary
                className={`px-8 bg-yellow-900 hover:bg-yellow-800 ${
                  result?.softwareEffort
                    ? "opacity-100"
                    : "opacity-50 select-none pointer-events-none"
                }`}
                onClick={handleSaveResult}
              >
                Save
              </Button>
            ) : (
              <Modal
                nameBtn="Save"
                primary={true}
                classNameBtn="px-8 bg-yellow-900 hover:bg-yellow-800"
              >
                <LoginPage />
              </Modal>
            )}
            <Button
              primary
              className="px-8 bg-cyan-900 hover:bg-cyan-800"
              onClick={handleResetConstruction}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-500 rounded-full"></div>
        <div className="flex flex-col gap-2 ">
          <Label label="Results" isTitle />
          <div>
            <Label
              label="Software Development (Elaboration and Construction)"
              isTitle
            />
          </div>
          <ResultItem
            label={`Effort = ${
              sizingMethod === "SLOC"
                ? "2.94 * (KLOC)^b * EAF"
                : "Language Factor * UFP"
            }`}
            unit="Person-months"
            result={result?.softwareEffort}
          />
          <ResultItem
            label="Schedule = 3.67 * E^0.3179"
            unit="Months"
            result={result?.softwareSchedule}
          />
          <ResultItem
            label="Cost = Effort * Cost per Person-Month"
            unit="$"
            result={result?.cost}
          />
          <ResultItem
            label="Total Equivalent Size = SLOCnew + SLOCreused * (%AA + %IR * 0.3)"
            unit="SLOC"
            result={result?.totalEquivalentSize}
          />
          <ResultItem
            label="Effort Adjustment Factor (EAF) = Product Factor * Platform Factor * Personnel Factor * Project Factor"
            result={result?.softwareEAF}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Acquisition Phase Distribution" isTitle />
          <AcquisitionDistributeTable result={result} />
        </div>
        {result?.dataChart?.length > 0 && (
          <div className="flex flex-col gap-2">
            <Label label="Staffing Profile" isTitle />
            <VerticalBarChart data={result?.dataChart} className="h-[360px]" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Label
            label="Software Effort Distribution for RUP/MBASE (Person-Months)"
            isTitle
          />
          <SoftwareEffortDistributeTable result={result} />
        </div>
      </form>
    </div>
  );
};

export default CalculatePage;
