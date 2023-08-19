import React from "react";
import { Chart } from "react-google-charts";

export function Pie({ winCount, loseCount }) {
  const data = [
    ["Ratio", "Victoire/Défaite"],
    ["Victoire", winCount],
    ["Défaite", loseCount],
  ];

  const options = {
    legend: "none",
    pieSliceText: "label",
    title: "",
    pieStartAngle: 100,
    backgroundColor: '#f5f1e6',
    chartArea: {width: 400, height: 300},
    is3D: true,


  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"500px"}
      height={"150px"}
    />
  );
}
