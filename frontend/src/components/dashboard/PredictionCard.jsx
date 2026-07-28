import { useEffect, useState } from "react";
import {
  FaRobot,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

import {
  getPrediction,
  getRecommendation,
} from "../../api/stockApi";

function PredictionCard() {
  const [prediction, setPrediction] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPrediction = async () => {
    try {
      setLoading(true);

      const symbol =
        localStorage.getItem("selectedStock") || "TCS";

      const predictionData = await getPrediction(symbol);
      const recommendationData = await getRecommendation(symbol);

      setPrediction(predictionData);
      setRecommendation(recommendationData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrediction();

    window.addEventListener(
      "stockChanged",
      loadPrediction
    );

    return () =>
      window.removeEventListener(
        "stockChanged",
        loadPrediction
      );
  }, []);

  if (loading) {
    return (
      <div className="dashboard-card">
        <h2>AI Prediction</h2>
        <p>Loading prediction...</p>
      </div>
    );
  }

  const signal =
    recommendation?.signal ||
    prediction?.signal ||
    "HOLD";

  const confidence =
    recommendation?.confidence ||
    prediction?.confidence ||
    0;

  const target =
    recommendation?.target_price ||
    prediction?.target_price ||
    "-";

  return (
    <div className="dashboard-card prediction-card">

      <div className="card-header">

        <div className="card-title">

          <FaRobot className="card-icon" />

          <h2>AI Prediction</h2>

        </div>

        <span className="card-badge">
          LIVE
        </span>

      </div>

      <div
        className={
          signal === "BUY"
            ? "prediction-buy"
            : signal === "SELL"
            ? "prediction-sell"
            : "prediction-hold"
        }
      >
        {signal === "BUY" ? (
          <FaArrowTrendUp />
        ) : signal === "SELL" ? (
          <FaArrowTrendDown />
        ) : (
          <FaRobot />
        )}

        {signal}
      </div>

      <div className="prediction-details">

        <div>

          <span>Confidence</span>

          <h3>{confidence}%</h3>

        </div>

        <div>

          <span>Target Price</span>

          <h3>{target}</h3>

        </div>

      </div>

      <button className="card-button">
        View AI Analysis
      </button>

    </div>
  );
}

export default PredictionCard;