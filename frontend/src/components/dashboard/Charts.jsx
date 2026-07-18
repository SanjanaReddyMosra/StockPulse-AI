import { useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa6";
import { getHistory } from "../../api/stockAPI";

function Charts() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChart = async () => {
    try {
      setLoading(true);

      const symbol =
        localStorage.getItem("selectedStock") || "TCS";

      const data = await getHistory(symbol);

      setHistory(data);
    } catch (err) {
      console.error("Chart Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChart();

    window.addEventListener("stockChanged", loadChart);

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
          <h2>Market Trend</h2>
        </div>

        <span className="card-badge">
          {localStorage.getItem("selectedStock") || "TCS"}
        </span>
      </div>

      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <>
          <div className="chart-placeholder">
            <div className="chart-line"></div>
          </div>

          <div className="market-stats">
            <div className="market-stat">
              <span>Records</span>
              <h4>{history.length}</h4>
            </div>

            <div className="market-stat">
              <span>Latest Close</span>
              <h4>
                ₹
                {history.length
                  ? history[history.length - 1]?.Close
                  : "-"}
              </h4>
            </div>

            <div className="market-stat">
              <span>Status</span>
              <h4>Live</h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Charts;