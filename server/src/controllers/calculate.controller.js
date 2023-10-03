const asyncHandler = require("express-async-handler");
const Result = require("../models/construction.model");
const { getFactorValue, getLanguageFactorValue } = require("../utils/fn");

const calculateFunctionPoints = asyncHandler(async (req, res) => {
  const {
    sizeType,
    language,
    functionPoints = 0,
    PREC,
    FLEX,
    RESL,
    TEAM,
    PMAT,
    RELY,
    DATA,
    CPLX,
    RUSE,
    DOCU,
    ACAP,
    PCAP,
    PCON,
    AEXP,
    PEXP,
    LTEX,
    TIME,
    STOR,
    PVOL,
    TOOL,
    SITE,
    SCED,
    softwareLaborCostPerPM = 0,
  } = req.body;

  if (!sizeType) throw new Error("sizeType field is required !");

  let b = 0;
  let a = 2.94;
  let EAF = 1;
  let effort = 0;
  let SLOC = 0;
  let schedule = 1;
  let cost = 0;
  let inceptionEffort = 0;
  let inceptionSchedule = 0;
  let inceptionAverageStaff = 0;
  let inceptionCost = 0;

  let elaborationEffort = 0;
  let elaborationSchedule = 0;
  let elaborationAverageStaff = 0;
  let elaborationCost = 0;

  let constructionEffort = 0;
  let constructionSchedule = 0;
  let constructionAverageStaff = 0;
  let constructionCost = 0;

  let transitionEffort = 0;
  let transitionSchedule = 0;
  let transitionAverageStaff = 0;
  let transitionCost = 0;

  let managementInception = 0;
  let environmentPerCMInception = 0;
  let requirementsInception = 0;
  let designInception = 0;
  let implementationInception = 0;
  let assessmentInception = 0;
  let deploymentInception = 0;
  let managementElaboration = 0;
  let environmentPerCMElaboration = 0;
  let requirementsElaboration = 0;
  let designElaboration = 0;
  let implementationElaboration = 0;
  let assessmentElaboration = 0;
  let deploymentElaboration = 0;
  let managementConstruction = 0;
  let environmentPerCMConstruction = 0;
  let requirementsConstruction = 0;
  let designConstruction = 0;
  let implementationConstruction = 0;
  let assessmentConstruction = 0;
  let deploymentConstruction = 0;
  let managementTransition = 0;
  let environmentPerCMTransition = 0;
  let requirementsTransition = 0;
  let designTransition = 0;
  let implementationTransition = 0;
  let assessmentTransition = 0;
  let deploymentTransition = 0;
  let dataChart = [];
  let arr = [];
  let totalMonth = 0;

  if (sizeType === "FP") {
    // b = 0.91 + 0.01 * (sum(SF))
    b =
      0.91 +
      0.01 *
        (getFactorValue({ PREC }) +
          getFactorValue({ FLEX }) +
          getFactorValue({ RESL }) +
          getFactorValue({ TEAM }) +
          getFactorValue({ PMAT }));

    // EAF = (f1 * f2 * ... * fn)
    EAF =
      getFactorValue({ RELY }) *
      getFactorValue({ DATA }) *
      getFactorValue({ CPLX }) *
      getFactorValue({ RUSE }) *
      getFactorValue({ DOCU }) *
      getFactorValue({ ACAP }) *
      getFactorValue({ PCAP }) *
      getFactorValue({ PCON }) *
      getFactorValue({ AEXP }) *
      getFactorValue({ PEXP }) *
      getFactorValue({ LTEX }) *
      getFactorValue({ TIME }) *
      getFactorValue({ STOR }) *
      getFactorValue({ PVOL }) *
      getFactorValue({ TOOL }) *
      getFactorValue({ SITE }) *
      getFactorValue({ SCED });

    // SLOC = (Function points * language factor)
    SLOC = Number(functionPoints) * getLanguageFactorValue(language);

    // Effort = a * (SLOC)^b * EAF, a = 2.94
    effort = a * Math.pow(SLOC / 1000, b) * EAF;

    // Schedule = 3.67 * Effort^0.3179
    schedule = 3.67 * Math.pow(effort, 0.3179);

    // cost = (softwareLaborCostPerPM * Effort)
    cost = Number(softwareLaborCostPerPM) * effort;

    // Acquisition Phase Distribution Caculate
    inceptionEffort = Number(effort * (5.9818 / 100));
    inceptionSchedule = Number(schedule * (12.3288 / 100));
    inceptionAverageStaff = Number(inceptionEffort / inceptionSchedule);
    inceptionCost = Number(cost * (5.9857 / 100));

    elaborationEffort = Number(effort * (24.0572 / 100));
    elaborationSchedule = Number(schedule * (37.6712 / 100));
    elaborationAverageStaff = Number(elaborationEffort / elaborationSchedule);
    elaborationCost = Number(cost * (24 / 100));

    constructionEffort = Number(effort * (75.9428 / 100));
    constructionSchedule = Number(schedule * (62.3288 / 100));
    constructionAverageStaff = Number(
      constructionEffort / constructionSchedule
    );
    constructionCost = Number(cost * (76 / 100));

    transitionEffort = Number(effort * (11.9636 / 100));
    transitionSchedule = Number(schedule * (12.3288 / 100));
    transitionAverageStaff = Number(transitionEffort / transitionSchedule);
    transitionCost = Number(cost * (12 / 100));

    // Software Effort Distribution Calculate
    managementInception = Number(inceptionEffort * (13.9344 / 100));
    environmentPerCMInception = Number(inceptionEffort * (10.1093 / 100));
    requirementsInception = Number(inceptionEffort * (37.9781 / 100));
    designInception = Number(inceptionEffort * (19.1257 / 100));
    implementationInception = Number(inceptionEffort * (7.9235 / 100));
    assessmentInception = Number(inceptionEffort * (7.9235 / 100));
    deploymentInception = Number(inceptionEffort * (3.0055 / 100));

    managementElaboration = Number(elaborationEffort * (12.0137 / 100));
    environmentPerCMElaboration = Number(elaborationEffort * (7.9833 / 100));
    requirementsElaboration = Number(elaborationEffort * (18.0205 / 100));
    designElaboration = Number(elaborationEffort * (35.9727 / 100));
    implementationElaboration = Number(elaborationEffort * (12.9693 / 100));
    assessmentElaboration = Number(elaborationEffort * (10.0341 / 100));
    deploymentElaboration = Number(elaborationEffort * (3.0034 / 100));

    managementConstruction = Number(constructionEffort * (10.0022 / 100));
    environmentPerCMConstruction = Number(constructionEffort * (5.0011 / 100));
    requirementsConstruction = Number(constructionEffort * (7.9975 / 100));
    designConstruction = Number(constructionEffort * (15.9948 / 100));
    implementationConstruction = Number(constructionEffort * (33.9944 / 100));
    assessmentConstruction = Number(constructionEffort * (23.9922 / 100));
    deploymentConstruction = Number(constructionEffort * (2.9963 / 100));

    managementTransition = Number(transitionEffort * (14.0518 / 100));
    environmentPerCMTransition = Number(transitionEffort * (5.0477 / 100));
    requirementsTransition = Number(transitionEffort * (3.9563 / 100));
    designTransition = Number(transitionEffort * (3.9563 / 100));
    implementationTransition = Number(transitionEffort * (18.9632 / 100));
    assessmentTransition = Number(transitionEffort * (24.0109 / 100));
    deploymentTransition = Number(transitionEffort * (30.0136 / 100));

    totalMonth =
      Math.floor(inceptionSchedule) +
      Math.floor(elaborationSchedule) +
      Math.floor(constructionSchedule) +
      Math.floor(transitionSchedule);

    for (let i = 1; i <= totalMonth; i++) {
      arr.push(i);
    }

    for (let i = 1; i <= inceptionSchedule; i++) {
      dataChart.push({
        phase: "inception",
        value: inceptionEffort / inceptionSchedule,
      });
    }

    for (let i = 1; i <= elaborationSchedule; i++) {
      dataChart.push({
        phase: "elaboration",
        value: elaborationEffort / elaborationSchedule,
      });
    }

    for (let i = 1; i <= constructionSchedule; i++) {
      dataChart.push({
        phase: "construction",
        value: constructionEffort / constructionSchedule,
      });
    }

    for (let i = 1; i <= transitionSchedule; i++) {
      dataChart.push({
        phase: "transition",
        value: transitionEffort / transitionSchedule,
      });
    }

    arr = arr.map((item, index) => {
      return { _id: item, data: dataChart[index] };
    });
  }

  return res.status(200).json({
    success: true,
    message: "Calculate Cocomo ii type size Function Points successfully",
    data: {
      softwareEffort: effort,
      softwareSchedule: schedule,
      cost,
      totalEquivalentSize: SLOC,
      softwareEAF: EAF,
      inceptionEffort,
      inceptionSchedule,
      inceptionAverageStaff,
      inceptionCost,
      elaborationEffort,
      elaborationSchedule,
      elaborationAverageStaff,
      elaborationCost,
      constructionEffort,
      constructionSchedule,
      constructionAverageStaff,
      constructionCost,
      transitionEffort,
      transitionSchedule,
      transitionAverageStaff,
      transitionCost,
      managementInception,
      environmentPerCMInception,
      requirementsInception,
      designInception,
      implementationInception,
      assessmentInception,
      deploymentInception,

      managementElaboration,
      environmentPerCMElaboration,
      requirementsElaboration,
      designElaboration,
      implementationElaboration,
      assessmentElaboration,
      deploymentElaboration,

      managementConstruction,
      environmentPerCMConstruction,
      requirementsConstruction,
      designConstruction,
      implementationConstruction,
      assessmentConstruction,
      deploymentConstruction,

      managementTransition,
      environmentPerCMTransition,
      requirementsTransition,
      designTransition,
      implementationTransition,
      assessmentTransition,
      deploymentTransition,
      dataChart: arr,
    },
  });
});

const calculateSLOC = asyncHandler(async (req, res) => {
  const {
    sizeType,
    newSize = 0,
    reusedSize = 0,
    reusedIM = 0,
    reusedAA = 0,
    PREC,
    FLEX,
    RESL,
    TEAM,
    PMAT,
    RELY,
    DATA,
    CPLX,
    RUSE,
    DOCU,
    ACAP,
    PCAP,
    PCON,
    AEXP,
    PEXP,
    LTEX,
    TIME,
    STOR,
    PVOL,
    TOOL,
    SITE,
    SCED,
    softwareLaborCostPerPM,
  } = req.body;

  if (!sizeType) throw new Error("sizeType field is required !");

  let b = 0;
  let a = 2.94;
  let EAF = 1;
  let effort = 0;
  let SLOC = 0;
  let schedule = 1;
  let cost = 0;
  let inceptionEffort = 0;
  let inceptionSchedule = 0;
  let inceptionAverageStaff = 0;
  let inceptionCost = 0;

  let elaborationEffort = 0;
  let elaborationSchedule = 0;
  let elaborationAverageStaff = 0;
  let elaborationCost = 0;

  let constructionEffort = 0;
  let constructionSchedule = 0;
  let constructionAverageStaff = 0;
  let constructionCost = 0;

  let transitionEffort = 0;
  let transitionSchedule = 0;
  let transitionAverageStaff = 0;
  let transitionCost = 0;

  let managementInception = 0;
  let environmentPerCMInception = 0;
  let requirementsInception = 0;
  let designInception = 0;
  let implementationInception = 0;
  let assessmentInception = 0;
  let deploymentInception = 0;
  let managementElaboration = 0;
  let environmentPerCMElaboration = 0;
  let requirementsElaboration = 0;
  let designElaboration = 0;
  let implementationElaboration = 0;
  let assessmentElaboration = 0;
  let deploymentElaboration = 0;
  let managementConstruction = 0;
  let environmentPerCMConstruction = 0;
  let requirementsConstruction = 0;
  let designConstruction = 0;
  let implementationConstruction = 0;
  let assessmentConstruction = 0;
  let deploymentConstruction = 0;
  let managementTransition = 0;
  let environmentPerCMTransition = 0;
  let requirementsTransition = 0;
  let designTransition = 0;
  let implementationTransition = 0;
  let assessmentTransition = 0;
  let deploymentTransition = 0;
  let dataChart = [];
  let arr = [];
  let totalMonth = 0;

  if (sizeType === "SLOC") {
    // b = 0.91 + 0.01 * (sum(SF))
    b =
      0.91 +
      0.01 *
        (getFactorValue({ PREC }) +
          getFactorValue({ FLEX }) +
          getFactorValue({ RESL }) +
          getFactorValue({ TEAM }) +
          getFactorValue({ PMAT }));

    // EAF = (f1 * f2 * ... * fn)
    EAF =
      getFactorValue({ RELY }) *
      getFactorValue({ DATA }) *
      getFactorValue({ CPLX }) *
      getFactorValue({ RUSE }) *
      getFactorValue({ DOCU }) *
      getFactorValue({ ACAP }) *
      getFactorValue({ PCAP }) *
      getFactorValue({ PCON }) *
      getFactorValue({ AEXP }) *
      getFactorValue({ PEXP }) *
      getFactorValue({ LTEX }) *
      getFactorValue({ TIME }) *
      getFactorValue({ STOR }) *
      getFactorValue({ PVOL }) *
      getFactorValue({ TOOL }) *
      getFactorValue({ SITE }) *
      getFactorValue({ SCED });

    // SLOC = newSize + reusedSize * (0.3*IM/100 + AA/100)
    SLOC =
      Number(newSize) +
      Number(reusedSize) *
        ((0.3 * Number(reusedIM)) / 100 + Number(reusedAA) / 100);

    // Effort = a * (SLOC)^b * EAF, a = 2.94
    effort = a * Math.pow(SLOC / 1000, b) * EAF;

    // Schedule = 3.67 * Effort^0.3179
    schedule = 3.67 * Math.pow(effort, 0.3179);

    // cost = (softwareLaborCostPerPM * Effort)
    cost = Number(softwareLaborCostPerPM) * effort;

    // Acquisition Phase Distribution Caculate
    inceptionEffort = Number(effort * (5.9818 / 100));
    inceptionSchedule = Number(schedule * (12.3288 / 100));
    inceptionAverageStaff = Number(inceptionEffort / inceptionSchedule);
    inceptionCost = Number(cost * (5.9857 / 100));

    elaborationEffort = Number(effort * (24.0572 / 100));
    elaborationSchedule = Number(schedule * (37.6712 / 100));
    elaborationAverageStaff = Number(elaborationEffort / elaborationSchedule);
    elaborationCost = Number(cost * (24 / 100));

    constructionEffort = Number(effort * (75.9428 / 100));
    constructionSchedule = Number(schedule * (62.3288 / 100));
    constructionAverageStaff = Number(
      constructionEffort / constructionSchedule
    );
    constructionCost = Number(cost * (76 / 100));

    transitionEffort = Number(effort * (11.9636 / 100));
    transitionSchedule = Number(schedule * (12.3288 / 100));
    transitionAverageStaff = Number(transitionEffort / transitionSchedule);
    transitionCost = Number(cost * (12 / 100));

    // Software Effort Distribution Calculate
    managementInception = Number(inceptionEffort * (13.9344 / 100));
    environmentPerCMInception = Number(inceptionEffort * (10.1093 / 100));
    requirementsInception = Number(inceptionEffort * (37.9781 / 100));
    designInception = Number(inceptionEffort * (19.1257 / 100));
    implementationInception = Number(inceptionEffort * (7.9235 / 100));
    assessmentInception = Number(inceptionEffort * (7.9235 / 100));
    deploymentInception = Number(inceptionEffort * (3.0055 / 100));

    managementElaboration = Number(elaborationEffort * (12.0137 / 100));
    environmentPerCMElaboration = Number(elaborationEffort * (7.9833 / 100));
    requirementsElaboration = Number(elaborationEffort * (18.0205 / 100));
    designElaboration = Number(elaborationEffort * (35.9727 / 100));
    implementationElaboration = Number(elaborationEffort * (12.9693 / 100));
    assessmentElaboration = Number(elaborationEffort * (10.0341 / 100));
    deploymentElaboration = Number(elaborationEffort * (3.0034 / 100));

    managementConstruction = Number(constructionEffort * (10.0022 / 100));
    environmentPerCMConstruction = Number(constructionEffort * (5.0011 / 100));
    requirementsConstruction = Number(constructionEffort * (7.9975 / 100));
    designConstruction = Number(constructionEffort * (15.9948 / 100));
    implementationConstruction = Number(constructionEffort * (33.9944 / 100));
    assessmentConstruction = Number(constructionEffort * (23.9922 / 100));
    deploymentConstruction = Number(constructionEffort * (2.9963 / 100));

    managementTransition = Number(transitionEffort * (14.0518 / 100));
    environmentPerCMTransition = Number(transitionEffort * (5.0477 / 100));
    requirementsTransition = Number(transitionEffort * (3.9563 / 100));
    designTransition = Number(transitionEffort * (3.9563 / 100));
    implementationTransition = Number(transitionEffort * (18.9632 / 100));
    assessmentTransition = Number(transitionEffort * (24.0109 / 100));
    deploymentTransition = Number(transitionEffort * (30.0136 / 100));

    // Staffing Profile Chart
    totalMonth =
      Math.floor(inceptionSchedule) +
      Math.floor(elaborationSchedule) +
      Math.floor(constructionSchedule) +
      Math.floor(transitionSchedule);

    for (let i = 1; i <= totalMonth; i++) {
      arr.push(i);
    }

    for (let i = 1; i <= inceptionSchedule; i++) {
      dataChart.push({
        phase: "inception",
        value: inceptionEffort / inceptionSchedule,
      });
    }

    for (let i = 1; i <= elaborationSchedule; i++) {
      dataChart.push({
        phase: "elaboration",
        value: elaborationEffort / elaborationSchedule,
      });
    }

    for (let i = 1; i <= constructionSchedule; i++) {
      dataChart.push({
        phase: "construction",
        value: constructionEffort / constructionSchedule,
      });
    }

    for (let i = 1; i <= transitionSchedule; i++) {
      dataChart.push({
        phase: "transition",
        value: transitionEffort / transitionSchedule,
      });
    }

    arr = arr.map((item, index) => {
      return { _id: item, data: dataChart[index] };
    });
  }

  return res.status(200).json({
    success: true,
    message: "Calculate Cocomo ii type size Source Lines of Code  successfully",
    data: {
      b,
      softwareEffort: effort,
      softwareSchedule: schedule,
      cost,
      totalEquivalentSize: SLOC,
      softwareEAF: EAF,
      inceptionEffort,
      inceptionSchedule,
      inceptionAverageStaff,
      inceptionCost,
      elaborationEffort,
      elaborationSchedule,
      elaborationAverageStaff,
      elaborationCost,
      constructionEffort,
      constructionSchedule,
      constructionAverageStaff,
      constructionCost,
      transitionEffort,
      transitionSchedule,
      transitionAverageStaff,
      transitionCost,
      managementInception,
      environmentPerCMInception,
      requirementsInception,
      designInception,
      implementationInception,
      assessmentInception,
      deploymentInception,

      managementElaboration,
      environmentPerCMElaboration,
      requirementsElaboration,
      designElaboration,
      implementationElaboration,
      assessmentElaboration,
      deploymentElaboration,

      managementConstruction,
      environmentPerCMConstruction,
      requirementsConstruction,
      designConstruction,
      implementationConstruction,
      assessmentConstruction,
      deploymentConstruction,

      managementTransition,
      environmentPerCMTransition,
      requirementsTransition,
      designTransition,
      implementationTransition,
      assessmentTransition,
      deploymentTransition,
      dataChart: arr,
    },
  });
});

module.exports = { calculateFunctionPoints, calculateSLOC };
