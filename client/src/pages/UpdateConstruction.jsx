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
  Select,
  Modal,
  Title,
} from "../components";
import LoginPage from "./LoginPage";
import {
  getDetailConstructionThunkAction,
  updateConstructionThunkAction,
} from "../redux/features/constructionSlice";
import { toast } from "react-toastify";
import AcquisitionDistributeTable from "../components/AcquisitionDistributeTable";
import SoftwareEffortDistributeTable from "../components/SoftwareEffortDistributeTable";
import { useParams } from "react-router-dom";
import VerticalBarChart from "../components/VerticalBarChart";

const projectNameSchema = yup.object({
  projectName: yup.string().required("Required !"),
});

const UpdateConstruction = () => {
  const [sizingMethod, setSizingMethod] = useState("SLOC");
  const [resultState, setResultState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const { isLoggedIn } = useSelector(authSelect);
  const { result } = useSelector(calculateSelect);

  const dispatch = useDispatch();
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchGetConstructionAPI = async () => {
      try {
        setIsLoading(true);
        const res = await dispatch(
          getDetailConstructionThunkAction({
            userId: userInfo?._id,
            constructionId: id,
          })
        );

        if (res.payload.success) {
          setSizingMethod(res.payload.data?.sizeType);
          reset({ ...res.payload.data });
          setResultState({
            softwareEAF: res.payload.data?.softwareEAF,
            softwareEffort: res.payload.data?.softwareEffort,
            softwareSchedule: res.payload.data?.softwareSchedule,
            totalEquivalentSize: res.payload.data?.totalEquivalentSize,
            cost: res.payload.data?.cost,
            inceptionEffort: res.payload.data?.inceptionEffort,
            inceptionSchedule: res.payload.data?.inceptionSchedule,
            inceptionAverageStaff: res.payload.data?.inceptionAverageStaff,
            inceptionCost: res.payload.data?.inceptionCost,
            elaborationEffort: res.payload.data?.elaborationEffort,
            elaborationSchedule: res.payload.data?.elaborationSchedule,
            elaborationAverageStaff: res.payload.data?.elaborationAverageStaff,
            elaborationCost: res.payload.data?.elaborationCost,
            constructionEffort: res.payload.data?.constructionEffort,
            constructionSchedule: res.payload.data?.constructionSchedule,
            constructionAverageStaff:
              res.payload.data?.constructionAverageStaff,
            constructionCost: res.payload.data?.constructionCost,
            transitionEffort: res.payload.data?.transitionEffort,
            transitionSchedule: res.payload.data?.transitionSchedule,
            transitionAverageStaff: res.payload.data?.transitionAverageStaff,
            transitionCost: res.payload.data?.transitionCost,

            managementInception: res.payload.data?.managementInception,
            environmentPerCMInception:
              res.payload.data?.environmentPerCMInception,
            requirementsInception: res.payload.data?.requirementsInception,
            designInception: res.payload.data?.designInception,
            implementationInception: res.payload.data?.implementationInception,
            assessmentInception: res.payload.data?.assessmentInception,
            deploymentInception: res.payload.data?.deploymentInception,

            managementElaboration: res.payload.data?.managementElaboration,
            environmentPerCMElaboration:
              res.payload.data?.environmentPerCMElaboration,
            requirementsElaboration: res.payload.data?.requirementsElaboration,
            designElaboration: res.payload.data?.designElaboration,
            implementationElaboration:
              res.payload.data?.implementationElaboration,
            assessmentElaboration: res.payload.data?.assessmentElaboration,
            deploymentElaboration: res.payload.data?.deploymentElaboration,

            managementConstruction: res.payload.data?.managementConstruction,
            environmentPerCMConstruction:
              res.payload.data?.environmentPerCMConstruction,
            requirementsConstruction:
              res.payload.data?.requirementsConstruction,
            designConstruction: res.payload.data?.designConstruction,
            implementationConstruction:
              res.payload.data?.implementationConstruction,
            assessmentConstruction: res.payload.data?.assessmentConstruction,
            deploymentConstruction: res.payload.data?.deploymentConstruction,

            managementTransition: res.payload.data?.managementTransition,
            environmentPerCMTransition:
              res.payload.data?.environmentPerCMTransition,
            requirementsTransition: res.payload.data?.requirementsTransition,
            designTransition: res.payload.data?.designTransition,
            implementationTransition:
              res.payload.data?.implementationTransition,
            assessmentTransition: res.payload.data?.assessmentTransition,
            deploymentTransition: res.payload.data?.deploymentTransition,
          });
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchGetConstructionAPI();
  }, [userInfo?._id, id, dispatch]);

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
      console.log(formatData);
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

  const handleUpdateResult = async (e) => {
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
        ...result,
      };
      const res = await dispatch(
        updateConstructionThunkAction({
          userId: userInfo?._id,
          constructionId: id,
          data: formatData,
        })
      );
      if (res.payload.success) {
        toast.success("Save construction successfullty");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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
                className="px-8 bg-yellow-900 hover:bg-yellow-800"
                onClick={handleUpdateResult}
              >
                Update
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
            label="Effort"
            unit="Person-months"
            result={result?.softwareEffort || resultState?.softwareEffort}
          />
          <ResultItem
            label="Schedule"
            unit="Months"
            result={result?.softwareSchedule || resultState?.softwareSchedule}
          />
          <ResultItem
            label="Cost"
            unit="$"
            result={result?.cost || resultState?.cost}
          />
          <ResultItem
            label="Total Equivalent Size"
            unit="SLOC"
            result={
              result?.totalEquivalentSize || resultState?.totalEquivalentSize
            }
          />
          <ResultItem
            label="Effort Adjustment Factor (EAF)"
            result={result?.softwareEAF || resultState?.softwareEAF}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Acquisition Phase Distribution" isTitle />
          <AcquisitionDistributeTable
            result={result?.softwareEffort ? result : resultState}
          />
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
          <SoftwareEffortDistributeTable
            result={result.softwareEffort ? result : resultState}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateConstruction;
