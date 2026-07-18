import { useEffect, useState } from "react";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaRobot,
} from "react-icons/fa6";

import { getStock, getRecommendation } from "../../api/stockAPI";

import "../../styles/dashboard.css";

function MarketOverview() {
  const [stock, setStock] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const loadData = async () => {
    try {
      const symbol =
        localStorage.getItem("selectedStock") || "TCS";

      const stockData = await getStock(symbol);
      const recommendationData = await getRecommendation(symbol);

      setStock(stockData);
      setRecommendation(recommendationData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();

    window.addEventListener("stockChanged", loadData);

    return () =>
      window.removeEventListener(
        "stockChanged",
        loadData
      );
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-left">
        <span className="hero-tag">
          AI Powered Stock Intelligence
        </span>

        <h1>Good Evening 👋</h1>

        <h2>
          {stock
            ? `Tracking ${stock.symbol}`
            : "Loading..."}
        </h2>

        <p>
          Analyze stocks, monitor the market,
          discover opportunities and receive
          AI-powered investment insights.
        </p>

        <div className="market-grid">
          <div className="market-card">
            <h3>{stock?.symbol || "TCS"}</h3>

            <span className="price">
              ₹{stock?.price ?? "--"}
            </span>

            <div
              className={
                stock?.change >= 0
                  ? "positive market-change"
                  : "negative market-change"
              }
            >
              {stock?.change >= 0 ? (
                <FaArrowTrendUp />
              ) : (
                <FaArrowTrendDown />
              )}

              {stock?.change ?? 0}%
            </div>
          </div>

          <div className="market-card">
            <h3>High</h3>

            <span className="price">
              ₹{stock?.high ?? "--"}
            </span>
          </div>

          <div className="market-card">
            <h3>Low</h3>

            <span className="price">
              ₹{stock?.low ?? "--"}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="ai-card">
          <div className="ai-icon">
            <FaRobot />
          </div>

          <span className="ai-title">
            AI Recommendation
          </span>

          <h2>
            {recommendation?.signal || "HOLD"}
          </h2>

          <h3>
            {stock?.symbol || "TCS"}
          </h3>

          <div className="confidence">
            Confidence

            <strong>
              {recommendation?.confidence ?? "--"}%
            </strong>
          </div>

          <div className="expected-return">
            Target Price

            <span>
              ₹
              {recommendation?.target_price ??
                "--"}
            </span>
          </div>

          <button className="analyze-btn">
            Analyze Stock
          </button>
        </div>
      </div>
    </section>
  );
}

export default MarketOverview;