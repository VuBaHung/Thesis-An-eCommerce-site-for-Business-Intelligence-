import React from "react";
import { Bar } from "react-chartjs-2";

const OrderChart = ({ ordersData, name, precision }) => {
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
        data: ordersData,
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

  return <Bar data={data} options={options} />;
};

export default OrderChart;
