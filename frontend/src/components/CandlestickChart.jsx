import React from "react";
import Chart from "react-apexcharts";

function CandlestickChart({ data }) {
  const series = [
    {
      data: data,
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 500,
      background: "#0f172a",
    },

    theme: {
      mode: "dark",
    },

    xaxis: {
      type: "datetime",
    },

    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">
        Candlestick Chart
      </h2>

      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={500}
      />
    </div>
  );
}

export default CandlestickChart;
