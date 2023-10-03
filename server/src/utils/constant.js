const languageFactor = {
  basic: 64,
  C: 128,
  databaseDefault: 40,
  java: 53,
  PERL: 21,
  thirdGeneration: 80,
};

const factorials = [
  {
    PREC: {
      veryLow: 6.2,
      low: 4.96,
      nominal: 3.72,
      high: 2.48,
      veryHigh: 1.24,
      extraHigh: 0.0,
    },
  },
  {
    FLEX: {
      veryLow: 5.07,
      low: 4.05,
      nominal: 3.04,
      high: 2.03,
      veryHigh: 1.01,
      extraHigh: 0.0,
    },
  },
  {
    RESL: {
      veryLow: 7.07,
      low: 5.65,
      nominal: 4.24,
      high: 2.83,
      veryHigh: 1.41,
      extraHigh: 0.0,
    },
  },
  {
    TEAM: {
      veryLow: 5.48,
      low: 4.38,
      nominal: 3.29,
      high: 2.19,
      veryHigh: 1.1,
      extraHigh: 0.0,
    },
  },
  {
    PMAT: {
      veryLow: 7.8,
      low: 6.24,
      nominal: 4.68,
      high: 3.12,
      veryHigh: 1.56,
      extraHigh: 0.0,
    },
  },
  {
    RELY: {
      veryLow: 0.82,
      low: 0.92,
      nominal: 1.0,
      high: 1.1,
      veryHigh: 1.26,
      extraHigh: null,
    },
  },
  {
    DATA: {
      veryLow: null,
      low: 0.9,
      nominal: 1.0,
      high: 1.14,
      veryHigh: 1.28,
      extraHigh: null,
    },
  },
  {
    CPLX: {
      veryLow: 0.73,
      low: 0.87,
      nominal: 1.0,
      high: 1.17,
      veryHigh: 1.34,
      extraHigh: 1.74,
    },
  },
  {
    RUSE: {
      veryLow: null,
      low: 0.95,
      nominal: 1.0,
      high: 1.07,
      veryHigh: 1.15,
      extraHigh: 1.24,
    },
  },
  {
    DOCU: {
      veryLow: 0.81,
      low: 0.91,
      nominal: 1.0,
      high: 1.11,
      veryHigh: 1.23,
      extraHigh: null,
    },
  },
  {
    // const personnelFactor
    ACAP: {
      veryLow: 1.42,
      low: 1.19,
      nominal: 1.0,
      high: 0.85,
      veryHigh: 0.71,
      extraHigh: null,
    },
  },
  {
    PCAP: {
      veryLow: 1.34,
      low: 1.15,
      nominal: 1.0,
      high: 0.88,
      veryHigh: 0.76,
      extraHigh: null,
    },
  },
  {
    PCON: {
      veryLow: 1.29,
      low: 1.12,
      nominal: 1.0,
      high: 0.9,
      veryHigh: 0.81,
      extraHigh: null,
    },
  },
  {
    AEXP: {
      veryLow: 1.22,
      low: 1.1,
      nominal: 1.0,
      high: 0.88,
      veryHigh: 0.81,
      extraHigh: null,
    },
  },
  {
    PEXP: {
      veryLow: 1.19,
      low: 1.09,
      nominal: 1.0,
      high: 0.91,
      veryHigh: 0.85,
      extraHigh: null,
    },
  },
  {
    LTEX: {
      veryLow: 1.2,
      low: 1.09,
      nominal: 1.0,
      high: 0.91,
      veryHigh: 0.84,
      extraHigh: null,
    },
  },
  {
    // const platformFactor
    TIME: {
      veryLow: null,
      low: null,
      nominal: 1.0,
      high: 1.11,
      veryHigh: 1.29,
      extraHigh: 1.63,
    },
  },
  {
    STOR: {
      veryLow: null,
      low: null,
      nominal: 1.0,
      high: 1.05,
      veryHigh: 1.17,
      extraHigh: 1.46,
    },
  },
  {
    PVOL: {
      veryLow: null,
      low: 0.87,
      nominal: 1.0,
      high: 1.15,
      veryHigh: 1.3,
      extraHigh: null,
    },
  },
  {
    // const projectFactor
    TOOL: {
      veryLow: 1.17,
      low: 1.09,
      nominal: 1.0,
      high: 0.9,
      veryHigh: 0.78,
      extraHigh: null,
    },
  },
  {
    SITE: {
      veryLow: 1.22,
      low: 1.09,
      nominal: 1.0,
      high: 0.93,
      veryHigh: 0.86,
      extraHigh: 0.8,
    },
  },
  {
    SCED: {
      veryLow: 1.43,
      low: 1.14,
      nominal: 1.0,
      high: 1.0,
      veryHigh: 1.0,
      extraHigh: null,
    },
  },
];

const acquisitionPhaseDistributionConstant = {
  inceptionEffort: 5.9818,
  inceptionSchedule: 12.3288,
  inceptionCost: 5.9857,

  elaborationEffort: 24.0572,
  elaborationSchedule: 37.6712,
  elaborationCost: 24,

  constructionEffort: 75.9428,
  constructionSchedule: 62.3288,
  constructionCost: 76,

  transitionEffort: 11.9636,
  transitionSchedule: 12.3288,
  transitionCost: 12,
};

const softwareEffortDistributionConstant = {
  managementInception: 13.9344,
  environmentPerCMInception: 10.1093,
  requirementsInception: 37.9781,
  designInception: 19.1257,
  implementationInception: 7.9235,
  assessmentInception: 7.9235,
  deploymentInception: 3.0055,

  managementElaboration: 12.0137,
  environmentPerCMElaboration: 7.9833,
  requirementsElaboration: 18.0205,
  designElaboration: 35.9727,
  implementationElaboration: 12.9693,
  assessmentElaboration: 10.0341,
  deploymentElaboration: 3.0034,

  managementConstruction: 10.0022,
  environmentPerCMConstruction: 5.0011,
  requirementsConstruction: 7.9975,
  designConstruction: 15.9948,
  implementationConstruction: 33.9944,
  assessmentConstruction: 23.9922,
  deploymentConstruction: 2.9963,

  managementTransition: 14.0518,
  environmentPerCMTransition: 5.0477,
  requirementsTransition: 3.9563,
  designTransition: 3.9563,
  implementationTransition: 18.9632,
  assessmentTransition: 24.0109,
  deploymentTransition: 30.0136,
};

module.exports = {
  languageFactor,
  factorials,
  acquisitionPhaseDistributionConstant,
  softwareEffortDistributionConstant,
};
