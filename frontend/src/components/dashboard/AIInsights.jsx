import { useEffect, useState } from "react";
import { getStock } from "../../api/stockApi";
import "../../styles/aiinsights.css";

function AIInsights() {
  const [stock, setStock] = useState(null);

  useEffect(() => {
    loadData();

    window.addEventListener("stockChanged", loadData);

    return () =>
      window.removeEventListener("stockChanged", loadData);
  }, []);

  const loadData = async () => {
    try {
      const symbol =
        localStorage.getItem("selectedStock") || "TCS";

      const data = await getStock(symbol);

      setStock(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stock)
    return <div className="ai-insights card">Loading...</div>;

  const recommendationColor =
    stock.recommendation === "BUY"
      ? "#22C55E"
      : stock.recommendation === "SELL"
      ? "#EF4444"
      : "#F59E0B";

  return (
    <div className="ai-insights card">

      <div className="card-header">
        <h3>🤖 AI Market Insights</h3>
      </div>

      <div className="insight-box">

        <div className="recommendation">

          <span>Recommendation</span>

          <h2 style={{ color: recommendationColor }}>
            {stock.recommendation}
          </h2>

        </div>

        <div className="confidence">

          <span>Confidence</span>

          <h2>{stock.confidence}%</h2>

        </div>

      </div>

      <div className="analysis">

        <p>
          <strong>Prediction:</strong> {stock.prediction}
        </p>

        <p>
          <strong>Trend:</strong> {stock.trend}
        </p>

        <p>
          <strong>Daily Return:</strong> {stock.daily_return}%
        </p>

        <p>
          <strong>RSI:</strong> {stock.rsi}
        </p>

      </div>

    </div>
  );
}

export default AIInsights;