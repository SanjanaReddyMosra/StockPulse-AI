import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FaChartLine } from "react-icons/fa6";
import { getHistory } from "../../api/stockAPI";

function Charts() {
  const [series, setSeries] = useState([]);
  const [symbol, setSymbol] = useState("TCS");

  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
      background: "transparent",
    },

    theme: {
      mode: "dark",
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: [],
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

    tooltip: {
      theme: "dark",
    },

    colors: ["#2563EB"],

    grid: {
      borderColor: "#334155",
    },
  });

  const loadChart = async () => {
  try {
    const selected =
      localStorage.getItem("selectedStock") || "TCS";

    setSymbol(selected);

    const response = await getHistory(selected);

    const history = response.history;

    const prices = history.map(item => item.close);

    const dates = history.map(item =>
      item.date.substring(5)
    );

    setSeries([
      {
        name: selected,
        data: prices,
      },
    ]);

    setOptions(prev => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        categories: dates,
      },
    }));

  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    loadChart();

    window.addEventListener(
      "stockChanged",
      loadChart
    );

    return () =>
      window.removeEventListener(
        "stockChanged",
        loadChart
      );
  }, []);

  return (
    <div className="dashboard-card">

      <div className="card-header">

        <div className="card-title">

          <FaChartLine className="card-icon" />

          <h2>{symbol} Price Trend</h2>

        </div>

        <span className="card-badge">

          Live

        </span>

      </div>

      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
      />

    </div>
  );
}

export default Charts;