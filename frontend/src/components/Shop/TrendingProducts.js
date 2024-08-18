import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const TrendingProducts = ({ productNames, productSales }) => {
  // Prepare data for Chart.js
  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Quantity of product",
        data: productSales,
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
          precision: 0,
        },
      },
      x: {
        ticks: {
          callback: function (value) {
            // truncate the labels only in this axis
            const lbl = this.getLabelForValue(value);
            if (typeof lbl === "string" && lbl.length > 10) {
              return `${lbl.substring(0, 10)}...`;
            }
            return lbl;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TrendingProducts;
