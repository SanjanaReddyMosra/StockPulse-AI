import {
  FaWallet,
  FaArrowTrendUp,
  FaChartPie,
} from "react-icons/fa6";

function PortfolioCard() {
  return (
    <div className="dashboard-card portfolio-card">

      <div className="card-header">

        <div className="card-title">

          <FaWallet className="card-icon" />

          <h2>Portfolio</h2>

        </div>

        <span className="card-badge">
          Live
        </span>

      </div>

      <div className="portfolio-value">

        ₹1,25,430

      </div>

      <div className="portfolio-profit">

        <FaArrowTrendUp />

        +₹2,845 (+2.31%)

      </div>

      <div className="portfolio-stats">

        <div>

          <span>Invested</span>

          <h3>₹1,10,000</h3>

        </div>

        <div>

          <span>Holdings</span>

          <h3>12 Stocks</h3>

        </div>

      </div>

      <button className="card-button">

        <FaChartPie />

        View Portfolio

      </button>

    </div>
  );
}

export default PortfolioCard;