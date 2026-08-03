import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { getPortfolio } from "../../api/stockAPI";

function PortfolioCard() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      const data = await getPortfolio();
      setPortfolio(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!portfolio) {
    return (
      <div className="dashboard-card">
        <h2>Portfolio</h2>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  const profit =
    portfolio.current_value -
    portfolio.invested;

  const profitPercent =
    ((profit / portfolio.invested) * 100).toFixed(2);

  return (
    <div className="dashboard-card portfolio-card">

      <div className="portfolio-header">

        <h2>

          <FaWallet />

          Portfolio

        </h2>

        <span className="live-tag">

          LIVE

        </span>

      </div>

      <h1>

        ₹{portfolio.current_value.toLocaleString()}

      </h1>

      <div
        className={
          profit >= 0
            ? "positive"
            : "negative"
        }
      >

        ₹{profit.toLocaleString()}

        ({profitPercent}%)

      </div>

      <div className="portfolio-info">

        <div>

          <span>Invested</span>

          <strong>

            ₹{portfolio.invested.toLocaleString()}

          </strong>

        </div>

        <div>

          <span>Holdings</span>

          <strong>

            {portfolio.total_stocks}

          </strong>

        </div>

      </div>

      <button className="portfolio-btn">

        View Portfolio

      </button>

    </div>
  );
}

export default PortfolioCard;