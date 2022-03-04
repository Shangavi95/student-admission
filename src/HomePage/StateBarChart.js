import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Student State Chart",
    },
  },
};

const chartData = JSON.parse(localStorage.getItem("studentInfo"));

const stateChartData = chartData.map((studState) => studState.State);
console.log(stateChartData, "stateFilter");

const studStateCount = (stateChartData) =>
  stateChartData.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});

console.log(studStateCount(stateChartData, "state and count object"));

var resultStateNames = Object.keys(studStateCount(stateChartData)).map(
  (key) => key
);

var resultStateCount = Object.keys(studStateCount(stateChartData)).map(
  (key) => studStateCount(stateChartData)[key]
);
console.log(resultStateNames, "state names only");
console.log(resultStateCount, "state count only");

const labels = resultStateNames;

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: resultStateCount,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function StateBarChart() {
  return (
    <Bar
      style={{ maxWidth: "70vw", maxHeight: "500px", padding: "50px 0 0 75px" }}
      options={options}
      data={data}
    />
  );
}
