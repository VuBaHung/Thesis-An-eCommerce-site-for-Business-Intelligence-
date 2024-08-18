import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
export const calculateTopCategoriesPerMonth = (orders) => {
  const monthlyCategories = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!monthlyCategories[monthYear]) {
      monthlyCategories[monthYear] = {};
    }

    if (!monthlyCategories[monthYear][order.cart[0].category]) {
      monthlyCategories[monthYear][order.cart[0].category] = 0;
    }

    monthlyCategories[monthYear][order.cart[0].category] += order.cart[0].qty;
  });
  return monthlyCategories;
};
const TrendingCategory = ({ orders }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      drawChart();
    }
  }, [orders]);

  const drawChart = () => {
    const topCategories = calculateTopCategoriesPerMonth(orders);

    const months = Object.keys(topCategories);
    const categoryData = Object.values(topCategories);
    const amounts = {};
    const colors = [
      "rgba(255, 0, 0, 1)",
      "rgba(0, 255, 0, 1)",
      "rgba(0, 0, 255, 1)",
    ];
    categoryData.forEach((item) => {
      Object.entries(item).forEach(([category, quantity]) => {
        amounts[category] = (amounts[category] || 0) + quantity;
      });
    });

    const ctx = document.getElementById("topCategoriesChart");

    const cate = Object.keys(amounts);
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months.reverse(),
        datasets: cate.map((cate, index) => ({
          label: `${cate}`,
          data: categoryData.map((item) => item[cate] || 0),
          borderColor: colors[index % colors.length],
          fill: false,
        })),
      },
      options: {
        scales: {
          y: {
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });

    setChart(newChart);
  };
  return <canvas id="topCategoriesChart" />;
};

export default TrendingCategory;
