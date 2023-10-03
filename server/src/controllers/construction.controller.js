const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Construction = require("../models/construction.model");
const User = require("../models/user.model");

const userById = asyncHandler(async (req, res, next, id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid)
    return res.status(400).json({
      success: true,
      message: "Id is invalid",
    });

  const user = await User.findById(id);

  if (!user)
    return res.status(400).json({
      success: true,
      message: "This user is not found",
    });

  req.user = user;
  next();
});

const constructionById = asyncHandler(async (req, res, next, id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid)
    return res.status(400).json({
      success: true,
      message: "Id is invalid",
    });

  const construction = await Construction.findById(id);

  if (!construction)
    return res.status(400).json({
      success: true,
      message: "This construction is not found",
    });

  req.construction = construction;
  next();
});

const getDetailConstruction = asyncHandler(async (req, res) => {
  const findConstruction = await Construction.findOne({
    _id: req.construction._id,
    ownerProject: req.user._id,
  }).populate("ownerProject", "displayName username email");

  if (!findConstruction)
    throw new Error(`This construction by id:${req.user._id} is not found`);

  return res.status(200).json({
    success: true,
    message: "Get detail construction is successfully",
    data: findConstruction,
  });
});

const saveConstruction = asyncHandler(async (req, res) => {
  const {
    projectName,
    sizeType,
    language,
    functionPoints = 0,
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
    softwareEAF,
    sizeExponent,
    softwareEffort,
    softwareSchedule,
    totalEquivalentSize,
    cost,
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
  } = req.body;

  if (!projectName) throw new Error("ProjectName field is required");

  const newConstruction = new Construction({
    ownerProject: req.user._id,
    projectName,
    sizeType,
    language,
    functionPoints: Number(functionPoints),
    newSize,
    reusedSize,
    reusedIM,
    reusedAA,
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
    softwareLaborCostPerPM: Number(softwareLaborCostPerPM),
    softwareEAF: Number(softwareEAF),
    // sizeExponent: Number(sizeExponent),
    //   scheduleExponent: Number(),
    softwareEffort: Number(softwareEffort),
    softwareSchedule: Number(softwareSchedule),
    totalEquivalentSize: Number(totalEquivalentSize),
    cost: Number(cost),

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
  });

  await newConstruction.save();

  return res.status(200).json({
    success: true,
    message: "Save construction is successfully",
    data: newConstruction,
  });
});

const updateConstruction = asyncHandler(async (req, res) => {
  const {
    projectName,
    sizeType,
    language,
    functionPoints = 0,
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
    softwareEAF,
    sizeExponent,
    softwareEffort,
    softwareSchedule,
    totalEquivalentSize,
    cost,
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
  } = req.body;

  const findConstruction = await Construction.findOne({
    _id: req.construction._id,
    ownerProject: req.user._id,
  });

  if (!findConstruction) throw new Error("Construction is not found");

  const updateConstruction = await Construction.findOneAndUpdate(
    {
      _id: findConstruction._id,
    },
    {
      $set: {
        projectName,
        sizeType,
        language,
        functionPoints,
        newSize,
        reusedSize,
        reusedIM,
        reusedAA,
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
        softwareEAF,
        sizeExponent,
        softwareEffort,
        softwareSchedule,
        totalEquivalentSize,
        cost,
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
      },
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Update construction are successfully",
    data: updateConstruction,
  });
});

const deleteConstruction = asyncHandler(async (req, res) => {
  const findConstruction = await Construction.findOne({
    _id: req.construction._id,
    ownerProject: req.user._id,
  });

  if (!findConstruction)
    throw new Error(`This construction by id:${req.user._id} is not found`);

  await Construction.findByIdAndDelete(findConstruction._id);

  return res.status(200).json({
    success: true,
    message: "Delete construction is successfully",
  });
});

const getListConstructionProject = asyncHandler(async (req, res) => {
  const search = req.query.q ? req.query.q : "";
  const regex = search
    .split(" ")
    .filter((q) => q)
    .join("|");
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const orderBy =
    req.query.orderBy &&
    (req.query.orderBy == "asc" || req.query.orderBy == "desc")
      ? req.query.orderBy
      : "asc";
  const limit =
    req.query.limit && req.query.limit > 0 ? Number(req.query.limit) : 16;
  const page =
    req.query.page && req.query.page > 0 ? Number(req.query.page) : 1;
  let skip = (page - 1) * limit;

  const filterArgs = {
    $or: [
      { projectName: { $regex: regex, $options: "i" } },
      { sizeType: { $regex: regex, $options: "i" } },
    ],
    ownerProject: req.user._id,
  };

  const countConstruction = await Construction.countDocuments(filterArgs);

  if (!countConstruction) throw new Error("List users are not found");

  const totalPage = Math.ceil(countConstruction / limit);

  if (page > totalPage) skip = (totalPage - 1) * limit;

  const constructions = await Construction.find(filterArgs)
    .sort({ [sortBy]: orderBy, _id: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    message: "Get list users are successfully",
    totalPage,
    currentPage: page,
    count: countConstruction,
    data: constructions,
  });
});

module.exports = {
  userById,
  constructionById,
  getDetailConstruction,
  saveConstruction,
  updateConstruction,
  deleteConstruction,
  getListConstructionProject,
};
