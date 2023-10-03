import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getDecimal, getFactorValue } from "../utils/fn";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    textOverflow: "auto",
    fontSize: 12,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "",
    alignItems: "",
    flexWrap: "wrap",
    gap: 2,
    padding: "10 60 10 60",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    padding: "8 0 8 0",
  },
});

function PDFDocument({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>COCOMO II - Constructive Cost Model</Text>

          <Text style={styles.title}>Overview</Text>

          <Text>
            - Project Onwer:{" "}
            {data?.ownerProject?.email || data?.ownerProject?.displayName}
          </Text>
          <Text>- Project Name: {data?.projectName}</Text>
          <Text>
            - Size Type:{" "}
            {`${
              data?.sizeType === "SLOC"
                ? "Source Lines of Code"
                : "Function Points"
            }`}
          </Text>

          {data?.sizeType === "SLOC" ? (
            <>
              <Text>- New SLOC: {data?.newSize || "0"} %</Text>
              <Text>- Reused % SLOC: {data?.reusedSize || "0"} %</Text>
              <Text>
                - Reused % Integration Required: {data?.reusedIM || "0"} %
              </Text>
              <Text>
                - Reused % Assessment and Assimilation(0% - 8%):{" "}
                {data?.reusedAA || "0"} %
              </Text>
            </>
          ) : (
            <>
              <Text>
                - Unadjusted Function Points: {data?.functionPoints || "0"}
              </Text>
              <Text>- Language: {data?.language || "0"}</Text>
            </>
          )}

          <Text style={styles.title}>Factorials</Text>

          <Text>
            - Precedentedness: {getFactorValue({ PREC: data?.PREC })} (N)
          </Text>
          <Text>
            - Development Flexibility: {getFactorValue({ FLEX: data?.FLEX })}{" "}
            (N)
          </Text>
          <Text>
            - Architecture / Risk Resolution:{" "}
            {getFactorValue({ RESL: data?.RESL })} (N)
          </Text>
          <Text>
            {`- Team Cohesion: ${getFactorValue({
              TEAM: data?.TEAM,
            })}`}
            (N)
          </Text>
          <Text>
            - Process Maturity: {getFactorValue({ PMAT: data?.PMAT })} (N)
          </Text>

          <Text>
            - Required Software Reliability:{" "}
            {getFactorValue({ RELY: data?.RELY })} (N)
          </Text>
          <Text>
            - Data Base Size: {getFactorValue({ DATA: data?.DATA })} (N)
          </Text>
          <Text>
            - Product Complexity: {getFactorValue({ CPLX: data?.CPLX })} (N)
          </Text>
          <Text>
            - Developed for Reusability: {getFactorValue({ RUSE: data?.RUSE })}{" "}
            (N)
          </Text>
          <Text>
            - Documentation Match to Lifecycle Needs:{" "}
            {getFactorValue({ DOCU: data?.DOCU })} (N)
          </Text>

          <Text>
            - Analyst Capability: {getFactorValue({ ACAP: data?.ACAP })} (N)
          </Text>
          <Text>
            - Programmer Capability: {getFactorValue({ PCAP: data?.PCAP })} (N)
          </Text>
          <Text>
            - Personnel Continuity: {getFactorValue({ PCON: data?.PCON })} (N)
          </Text>
          <Text>
            - Application Experience : {getFactorValue({ AEXP: data?.AEXP })}{" "}
            (N)
          </Text>
          <Text>
            - Platform Experience: {getFactorValue({ PEXP: data?.PEXP })} (N)
          </Text>
          <Text>
            - Language and Toolset Experience:{" "}
            {getFactorValue({ LTEX: data?.LTEX })} (N)
          </Text>

          <Text>
            - Time Constraint: {getFactorValue({ TIME: data?.TIME })} (N)
          </Text>
          <Text>
            - Storage Constraint: {getFactorValue({ STOR: data?.STOR })} (N)
          </Text>
          <Text>
            - Platform Volatility: {getFactorValue({ PVOL: data?.PVOL })} (N)
          </Text>

          <Text>
            - Use of Software Tools: {getFactorValue({ TOOL: data?.TOOL })} (N)
          </Text>
          <Text>
            - Multisite Development: {getFactorValue({ SITE: data?.SITE })} (N)
          </Text>
          <Text>
            - Required Development Schedule:{" "}
            {getFactorValue({ SCED: data?.SCED })} (N)
          </Text>

          <Text style={styles.title}>Result</Text>
          <Text>
            - Effort: {getDecimal(Number(data?.softwareEffort))} Person-months
          </Text>
          <Text>
            - Schedule: {getDecimal(Number(data?.softwareSchedule))} Months
          </Text>
          <Text>- Cost: {getDecimal(Number(data?.cost))} $</Text>
          <Text>
            - Total Equivalent Size:{" "}
            {getDecimal(Number(data?.totalEquivalentSize))} SLOC
          </Text>
          <Text>
            - Effort Adjustment Factor (EAF):{" "}
            {getDecimal(Number(data?.softwareEAF))}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
