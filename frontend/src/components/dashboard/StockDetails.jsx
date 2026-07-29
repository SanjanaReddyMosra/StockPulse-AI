import { useEffect, useState } from "react";
import { getStock } from "../../api/stockApi";
import "../../styles/stockdetails.css";

function StockDetails() {
  const [stock, setStock] = useState(null);

  useEffect(() => {
    loadStock();

    window.addEventListener("stockChanged", loadStock);

    return () =>
      window.removeEventListener("stockChanged", loadStock);
  }, []);

  const loadStock = async () => {
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
    return <div className="stock-details card">Loading...</div>;

  return (
    <div className="stock-details card">

      <div className="card-header">
        <h3>{stock.symbol} Statistics</h3>
      </div>

      <div className="stats-grid">

        <div className="stat-box">
          <span>Open</span>
          <h4>₹ {stock.open}</h4>
        </div>

        <div className="stat-box">
          <span>High</span>
          <h4>₹ {stock.high}</h4>
        </div>

        <div className="stat-box">
          <span>Low</span>
          <h4>₹ {stock.low}</h4>
        </div>

        <div className="stat-box">
          <span>Volume</span>
          <h4>{stock.volume.toLocaleString()}</h4>
        </div>

        <div className="stat-box">
          <span>RSI</span>
          <h4>{stock.rsi}</h4>
        </div>

        <div className="stat-box">
          <span>SMA 20</span>
          <h4>{stock.sma20}</h4>
        </div>

        <div className="stat-box">
          <span>SMA 50</span>
          <h4>{stock.sma50}</h4>
        </div>

        <div className="stat-box">
          <span>Trend</span>
          <h4>{stock.trend}</h4>
        </div>

      </div>

    </div>
  );
}

export default StockDetails;