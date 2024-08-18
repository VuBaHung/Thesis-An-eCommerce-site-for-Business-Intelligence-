import React from "react";
import { Line } from "react-chartjs-2";

const DashBoardLineChart = ({ ordersData, name, precision }) => {
  const a = Object.values(ordersData);
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: `${name} each month`,
        data: a,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        ticks: {
          precision: precision,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DashBoardLineChart;
