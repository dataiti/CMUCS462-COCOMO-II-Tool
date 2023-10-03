const sizingValues = [
  {
    key: "Source Lines of Code",
    value: "SLOC",
  },
  {
    key: "Function Points",
    value: "FP",
  },
];

const softwareSize = [
  {
    title: "Sizing Method",
    value: sizingValues,
  },
];

const languageFactor = [
  {
    title: "Language",
    values: [
      {
        key: "C",
        value: "C",
      },
      {
        key: "Basic",
        value: "basic",
      },
      {
        key: "Database - Default",
        value: "databaseDefault",
      },
      {
        key: "Java",
        value: "java",
      },
      {
        key: "PERL",
        value: "PERL",
      },
      {
        key: "3rd Generation Language",
        value: "thirdGeneration",
      },
    ],
  },
];

const levelValues = [
  {
    key: "Norminal",
    value: "norminal",
    isDefault: true,
  },
  {
    key: "Very Low",
    value: "veryLow",
  },
  {
    key: "Low",
    value: "low",
  },
  {
    key: "High",
    value: "high",
  },
  {
    key: "Very high",
    value: "veryHigh",
  },
  {
    key: "Extra High",
    value: "extraHigh",
  },
];

const softwareScaleDrivers = [
  {
    title: "Precedentedness",
    name: "PREC",
    value: levelValues,
  },
  {
    title: "Development Flexibility",
    name: "FLEX",
    value: levelValues,
  },
  {
    title: "Architecture / Risk Resolution",
    name: "RESL",
    value: levelValues,
  },
  {
    title: "Team Cohesion",
    name: "TEAM",
    value: levelValues,
  },
  {
    title: "Process Maturity",
    name: "PMAT",
    value: levelValues,
  },
];

const softwareCostDriversProduct = [
  {
    title: "Required Software Reliability",
    name: "RELY",
    value: levelValues,
  },
  {
    title: "Data Base Size",
    name: "DATA",
    value: levelValues,
  },
  {
    title: "Product Complexity",
    name: "CPLX",
    value: levelValues,
  },
  {
    title: "Developed for Reusability",
    name: "RUSE",
    value: levelValues,
  },
  {
    title: "Documentation Match to Lifecycle Needs",
    name: "DOCU",
    value: levelValues,
  },
];

const personnel = [
  {
    title: "Analyst Capability",
    name: "ACAP",
    value: levelValues,
  },
  {
    title: "Programmer Capability",
    name: "PCAP",
    value: levelValues,
  },
  {
    title: "Personnel Continuity",
    name: "PCON",
    value: levelValues,
  },
  {
    title: "Application Experience",
    name: "AEXP",
    value: levelValues,
  },
  {
    title: "Platform Experience",
    name: "PEXP",
    value: levelValues,
  },
  {
    title: "Language and Toolset Experience",
    name: "LTEX",
    value: levelValues,
  },
];

const platform = [
  {
    title: "Time Constraint",
    name: "TIME",
    value: levelValues,
  },
  {
    title: "Storage Constraint",
    name: "STOR",
    value: levelValues,
  },
  {
    title: "Platform Volatility",
    name: "PVOL",
    value: levelValues,
  },
];

const project = [
  {
    title: "Use of Software Tools",
    name: "TOOL",
    value: levelValues,
  },
  {
    title: "Multisite Development",
    name: "SITE",
    value: levelValues,
  },
  {
    title: "Required Development Schedule",
    name: "SCED",
    value: levelValues,
  },
];

// const languageFactor = {
//   basic: 64,
//   C: 128,
//   databaseDefault: 40,
//   java: 53,
//   PERL: 21,
//   thirdGeneration: 80,
// };

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

export {
  levelValues,
  languageFactor,
  softwareScaleDrivers,
  personnel,
  platform,
  project,
  softwareCostDriversProduct,
  softwareSize,
  factorials,
};
