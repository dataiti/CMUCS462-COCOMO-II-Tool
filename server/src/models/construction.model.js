const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    ownerProject: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    projectName: {
      type: String,
      trim: true,
    },
    typeMode: {
      type: String,
      enum: ["Basic", "Intermediate", "Detailed"],
    },
    sizeType: {
      type: String,
    },
    language: {
      type: String,
    },
    functionPoints: {
      type: Number,
      min: 0,
    },
    newSize: {
      type: Number,
      min: 0,
    },
    reusedSize: {
      type: Number,
      min: 0,
    },
    reusedIM: {
      type: Number,
      min: 0,
      max: 100,
    },
    reusedAA: {
      type: Number,
      min: 0,
      max: 8,
    },
    PREC: {
      type: String,
      default: "nominal",
    },
    FLEX: {
      type: String,
      default: "nominal",
    },
    RESL: {
      type: String,
      default: "nominal",
    },
    TEAM: {
      type: String,
      default: "nominal",
    },
    PMAT: {
      type: String,
      default: "nominal",
    },
    RELY: {
      type: String,
      default: "nominal",
    },
    DATA: {
      type: String,
      default: "nominal",
    },
    CPLX: {
      type: String,
      default: "nominal",
    },
    RUSE: {
      type: String,
      default: "nominal",
    },
    DOCU: {
      type: String,
      default: "nominal",
    },
    ACAP: {
      type: String,
      default: "nominal",
    },
    PCAP: {
      type: String,
      default: "nominal",
    },
    PCON: {
      type: String,
      default: "nominal",
    },
    AEXP: {
      type: String,
      default: "nominal",
    },
    PEXP: {
      type: String,
      default: "nominal",
    },
    LTEX: {
      type: String,
      default: "nominal",
    },
    TIME: {
      type: String,
      default: "nominal",
    },
    STOR: {
      type: String,
      default: "nominal",
    },
    PVOL: {
      type: String,
      default: "nominal",
    },
    TOOL: {
      type: String,
      default: "nominal",
    },
    SITE: {
      type: String,
      default: "nominal",
    },
    SCED: {
      type: String,
      default: "nominal",
    },
    softwareMaintenance: {
      type: String,
      default: "Off",
    },
    softwareLaborCostPerPM: {
      type: Number,
      min: 0,
    },
    // Software Development (Elaboration and Construction)
    softwareEAF: {
      type: Number,
      min: 0,
    },
    sizeExponent: {
      type: Number,
      min: 0,
    },
    scheduleExponent: {
      type: Number,
      min: 0,
    },
    softwareEffort: {
      type: Number,
      min: 0,
    },
    softwareSchedule: {
      type: Number,
      min: 0,
    },
    totalEquivalentSize: {
      type: Number,
      min: 0,
    },
    cost: {
      type: Number,
      min: 0,
    },
    // Acquisition Phase Distribution table
    inceptionAverageStaff: {
      type: Number,
      default: 0,
      min: 0,
    },
    elaborationAverageStaff: {
      type: Number,
      default: 0,
      min: 0,
    },
    constructionAverageStaff: {
      type: Number,
      default: 0,
      min: 0,
    },
    transitionAverageStaff: {
      type: Number,
      default: 0,
      min: 0,
    },
    inceptionEffort: {
      type: Number,
      default: 0,
      min: 0,
    },
    elaborationEffort: {
      type: Number,
      default: 0,
      min: 0,
    },
    constructionEffort: {
      type: Number,
      default: 0,
      min: 0,
    },
    transitionEffort: {
      type: Number,
      default: 0,
      min: 0,
    },
    inceptionSchedule: {
      type: Number,
      default: 0,
      min: 0,
    },
    elaborationSchedule: {
      type: Number,
      default: 0,
      min: 0,
    },
    constructionSchedule: {
      type: Number,
      default: 0,
      min: 0,
    },
    transitionSchedule: {
      type: Number,
      default: 0,
      min: 0,
    },
    inceptionCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    elaborationCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    constructionCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    transitionCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Software Effort Distribution for RUP/MBASE (Person-Months)
    managementInception: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    environmentPerCMInception: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    requirementsInception: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    designInception: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    implementationInception: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    assessmentInception: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    deploymentInception: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    managementElaboration: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    environmentPerCMElaboration: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    requirementsElaboration: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    designElaboration: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    implementationElaboration: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    assessmentElaboration: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    deploymentElaboration: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    managementConstruction: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    environmentPerCMConstruction: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    requirementsConstruction: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    designConstruction: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    implementationConstruction: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    assessmentConstruction: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    deploymentConstruction: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    managementTransition: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    environmentPerCMTransition: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    requirementsTransition: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    designTransition: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    implementationTransition: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    assessmentTransition: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
    deploymentTransition: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
