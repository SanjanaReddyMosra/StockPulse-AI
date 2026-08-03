import { useEffect, useState } from "react";
import {
  FaWallet,
  FaChartLine,
  FaRobot,
  FaNewspaper,
} from "react-icons/fa6";

import {
  getStock,
  getRecommendation,
} from "../../api/stockAPI";

function DashboardStats() {
  const [stock, setStock] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    loadData();

    window.addEventListener(
      "stockChanged",
      loadData
    );

    return () =>
      window.removeEventListener(
        "stockChanged",
        loadData
      );
  }, []);

  async function loadData() {
    const symbol =
      localStorage.getItem("selectedStock") || "TCS";

    try {
      const stockData = await getStock(symbol);
      const rec = await getRecommendation(symbol);

      setStock(stockData);
      setRecommendation(rec);
    } catch (err) {
      console.error(err);
    }
  }

  if (!stock) return null;

  return (
    <section className="dashboard-stats">

      <div className="stat-box">

        <FaWallet />

        <div>

          <h4>Current Price</h4>

          <h2>₹{stock.price}</h2>

        </div>

      </div>

      <div className="stat-box">

        <FaChartLine />

        <div>

          <h4>Daily Change</h4>

          <h2
            className={
              stock.percent >= 0
                ? "positive"
                : "negative"
            }
          >
            {stock.percent >= 0 ? "+" : ""}
            {stock.percent.toFixed(2)}%
          </h2>

        </div>

      </div>

      <div className="stat-box">

        <FaRobot />

        <div>

          <h4>AI Confidence</h4>

          <h2>
            {recommendation?.confidence ?? "--"}%
          </h2>

        </div>

      </div>

      <div className="stat-box">

        <FaNewspaper />

        <div>

          <h4>Recommendation</h4>

          <h2>
            {recommendation?.recommendation || "--"}
          </h2>

        </div>

      </div>

    </section>
  );
}

export default DashboardStats;