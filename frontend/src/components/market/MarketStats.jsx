function MarketStats({ stocks }) {
  const total = stocks.length;

  const buy = stocks.filter(
    (s) => s.recommendation === "BUY"
  ).length;

  const sell = stocks.filter(
    (s) => s.recommendation === "SELL"
  ).length;

  const hold = stocks.filter(
    (s) => s.recommendation === "HOLD"
  ).length;

  return (
    <div className="market-stats">

      <div className="stat-card">
        <h4>Total Stocks</h4>
        <h2>{total}</h2>
      </div>

      <div className="stat-card buy-card">
        <h4>BUY Signals</h4>
        <h2>{buy}</h2>
      </div>

      <div className="stat-card sell-card">
        <h4>SELL Signals</h4>
        <h2>{sell}</h2>
      </div>

      <div className="stat-card hold-card">
        <h4>HOLD Signals</h4>
        <h2>{hold}</h2>
      </div>

    </div>
  );
}

export default MarketStats;