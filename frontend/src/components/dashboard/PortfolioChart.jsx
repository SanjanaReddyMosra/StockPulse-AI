import Chart from "react-apexcharts";

function PortfolioChart() {

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      background: "transparent",
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: ["#3B82F6"],

    grid: {
      borderColor: "#1e293b",
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
      ],

      labels: {
        style: {
          colors: "#94A3B8",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8",
        },
      },
    },

    theme: {
      mode: "dark",
    },
  };

  const series = [
    {
      name: "Portfolio Value",
      data: [
        400000,
        420000,
        435000,
        450000,
        465000,
        490000,
        508000,
      ],
    },
  ];

  return (
    <div className="dashboard-card">

      <h2>Portfolio Performance</h2>

      <Chart
        options={options}
        series={series}
        type="area"
        height={300}
      />

    </div>
  );
}

export default PortfolioChart;