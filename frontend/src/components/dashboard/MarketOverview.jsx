import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaRobot,
} from "react-icons/fa6";

import "../../styles/dashboard.css";

function MarketOverview() {
  return (
    <section className="hero-section">

      <div className="hero-left">

        <span className="hero-tag">
          AI Powered Stock Intelligence
        </span>

        <h1>
          Good Evening 👋
        </h1>

        <h2>
          Welcome back, Investor
        </h2>

        <p>
          Analyze stocks, monitor the market,
          discover opportunities and receive
          AI-powered investment insights.
        </p>

        <div className="market-grid">

          <div className="market-card">

            <h3>NIFTY 50</h3>

            <span className="price">
              24,821
            </span>

            <div className="positive market-change">

              <FaArrowTrendUp />

              +0.84%

            </div>

          </div>

          <div className="market-card">

            <h3>SENSEX</h3>

            <span className="price">
              81,432
            </span>

            <div className="positive market-change">

              <FaArrowTrendUp />

              +0.71%

            </div>

          </div>

          <div className="market-card">

            <h3>BANK NIFTY</h3>

            <span className="price">
              56,120
            </span>

            <div className="negative market-change">

              <FaArrowTrendDown />

              -0.18%

            </div>

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

          <h2>BUY</h2>

          <h3>TCS</h3>

          <div className="confidence">

            Confidence

            <strong>94%</strong>

          </div>

          <div className="expected-return">

            Expected Return

            <span>+8.2%</span>

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