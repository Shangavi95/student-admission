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
      text: "Student University Count Chart",
    },
  },
};

const chartData = JSON.parse(localStorage.getItem("studentInfo"));

const uniChartData = chartData.map((studUni) => studUni.University);
console.log(uniChartData, "uniFilter");

const studUniCount = (uniChartData) =>
  uniChartData.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});

console.log(studUniCount(uniChartData), "uni and count object");

var resultUniNames = Object.keys(studUniCount(uniChartData)).map((key) => key);

var resultUniCount = Object.keys(studUniCount(uniChartData)).map(
  (key) => studUniCount(uniChartData)[key]
);
console.log(resultUniNames, "uni names only");
console.log(resultUniCount, "uni count only");

const labels = resultUniNames;

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: resultUniCount,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function UniversityBarChart() {
  return (
    <Bar
      style={{ maxWidth: "70vw", maxHeight: "500px", padding: "50px 0 0 75px" }}
      options={options}
      data={data}
    />
  );
}
