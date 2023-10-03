import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const VerticalBarChart = ({ data = [], className = "" }) => {
  let datacolor = [];
  data.forEach((item) => {
    item.data.phase === "inception" && datacolor.push("#991b1b");

    item.data.phase === "elaboration" && datacolor.push("#451a03");

    item.data.phase === "construction" && datacolor.push("#1e3a8a");

    item.data.phase === "transition" && datacolor.push("#166534");
  });

  const chartData = {
    labels: data.map((item) => item.display || item._id),

    datasets: [
      {
        label: "Staffing Profile",
        data: data.map((item) => item.data.value),
        backgroundColor: datacolor,
        hoverBackgroundColor: ["#0f172a"],
        barPercentage: 0.9,
      },
    ],
  };

  return (
    <div className={`p-1 ${className}`}>
      <Bar
        data={chartData}
        options={{
          indexAxis: "x",
          responsive: true,
        }}
      />
    </div>
  );
};

export default VerticalBarChart;
