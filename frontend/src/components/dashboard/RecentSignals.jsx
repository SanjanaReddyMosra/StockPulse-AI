import { useEffect, useState } from "react";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaMinus,
} from "react-icons/fa6";

import {
  getStocks,
  getRecommendation,
} from "../../api/stockAPI";

function RecentSignals() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    loadSignals();
  }, []);

  async function loadSignals() {
    try {
      const stocks = await getStocks();

      const firstFive = stocks.slice(0, 5);

      const data = await Promise.all(
        firstFive.map(async (symbol) => {
          try {
            const rec = await getRecommendation(symbol);

            return {
              symbol,
              recommendation: rec.recommendation,
              confidence: rec.confidence,
            };
          } catch {
            return null;
          }
        })
      );

      setSignals(data.filter(Boolean));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="dashboard-card">

      <h2>Recent AI Signals</h2>

      <div className="signals-list">

        {signals.map((signal) => (

          <div
            className="signal-item"
            key={signal.symbol}
          >

            <div>

              <strong>{signal.symbol}</strong>

              <p>

                Confidence

                {" "}

                {signal.confidence}%

              </p>

            </div>

            <div
              className={`signal-badge ${signal.recommendation.toLowerCase()}`}
            >

              {signal.recommendation === "BUY" && (
                <FaArrowTrendUp />
              )}

              {signal.recommendation === "SELL" && (
                <FaArrowTrendDown />
              )}

              {signal.recommendation === "HOLD" && (
                <FaMinus />
              )}

              {signal.recommendation}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentSignals;