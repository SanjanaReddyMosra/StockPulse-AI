import React from "react";
import Chart from "react-apexcharts";

function CandlestickChart({ data }) {
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: "Stock Price Chart",
      align: "left",
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

  const series = [
    {
      data: data,
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
}

export default CandlestickChart;