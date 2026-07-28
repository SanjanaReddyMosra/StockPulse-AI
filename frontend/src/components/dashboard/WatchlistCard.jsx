import {
  FaStar,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

const watchlist = [
  {
    symbol: "RELIANCE",
    price: "₹2,948",
    change: "+1.24%",
    positive: true,
  },
  {
    symbol: "TCS",
    price: "₹3,890",
    change: "+0.61%",
    positive: true,
  },
  {
    symbol: "INFY",
    price: "₹1,610",
    change: "-0.82%",
    positive: false,
  },
  {
    symbol: "HDFCBANK",
    price: "₹1,825",
    change: "+0.42%",
    positive: true,
  },
];

function WatchlistCard() {
  return (
    <div className="dashboard-card">

      <div className="card-header">

        <div className="card-title">

          <FaStar className="card-icon" />

          <h2>Watchlist</h2>

        </div>

        <span className="card-badge">

          {watchlist.length} Stocks

        </span>

      </div>

      <div className="watchlist-container">

        {watchlist.map((stock) => (

          <div
            className="watch-item"
            key={stock.symbol}
          >

            <div>

              <h3>{stock.symbol}</h3>

              <span>{stock.price}</span>

            </div>

            <div
              className={
                stock.positive
                  ? "positive watch-change"
                  : "negative watch-change"
              }
            >

              {stock.positive ? (
                <FaArrowTrendUp />
              ) : (
                <FaArrowTrendDown />
              )}

              {stock.change}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default WatchlistCard;