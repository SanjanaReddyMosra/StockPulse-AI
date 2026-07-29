import { useEffect, useState } from "react";
import { getStocks, getStock } from "../../api/stockAPI";

function StockTable({
  search,
  recommendation,
  sortBy,
  onStocksLoaded,
}) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const stocksPerPage = 10;

  useEffect(() => {
    loadStocks();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, recommendation, sortBy]);

  const loadStocks = async () => {
    try {
      const symbols = await getStocks();

      const data = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            return await getStock(symbol);
          } catch (error) {
            console.error(`Error loading ${symbol}:`, error);
            return null;
          }
        })
      );

      const validStocks = data.filter(Boolean);

      setStocks(validStocks);

      if (onStocksLoaded) {
        onStocksLoaded(validStocks);
      }
    } catch (err) {
      console.error("Failed to load stocks:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStocks = [...stocks]
    .filter((stock) =>
      stock.symbol
        ?.toLowerCase()
        .includes((search || "").toLowerCase())
    )
    .filter((stock) =>
      recommendation
        ? stock.recommendation === recommendation
        : true
    );

  switch (sortBy) {
    case "price":
      filteredStocks.sort((a, b) => b.price - a.price);
      break;

    case "confidence":
      filteredStocks.sort((a, b) => b.confidence - a.confidence);
      break;

    case "symbol":
      filteredStocks.sort((a, b) =>
        a.symbol.localeCompare(b.symbol)
      );
      break;

    default:
      break;
  }

  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;

  const currentStocks = filteredStocks.slice(
    indexOfFirstStock,
    indexOfLastStock
  );

  const selectStock = (symbol) => {
    localStorage.setItem("selectedStock", symbol);
    window.dispatchEvent(new Event("stockChanged"));
  };

  if (loading) {
    return <h3>Loading stocks...</h3>;
  }

  return (
    <>
      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
              <th>RSI</th>
              <th>SMA20</th>
              <th>SMA50</th>
              <th>Trend</th>
              <th>Prediction</th>
              <th>Recommendation</th>
              <th>Confidence</th>
            </tr>
          </thead>

          <tbody>
            {currentStocks.length > 0 ? (
              currentStocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  onClick={() => selectStock(stock.symbol)}
                  className="stock-row"
                >
                  <td>
                    <strong>{stock.symbol}</strong>
                  </td>

                  <td>₹{stock.price.toFixed(2)}</td>

                  <td
                    className={
                      stock.percent >= 0
                        ? "positive-change"
                        : "negative-change"
                    }
                  >
                    {stock.percent >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(stock.percent).toFixed(2)}%
                  </td>

                  <td>
                    <span
                      className={
                        stock.rsi < 30
                          ? "rsi-low"
                          : stock.rsi <= 70
                          ? "rsi-medium"
                          : "rsi-high"
                      }
                    >
                      {stock.rsi.toFixed(1)}
                    </span>
                  </td>

                  <td>{stock.sma20.toFixed(2)}</td>

                  <td>{stock.sma50.toFixed(2)}</td>

                  <td>
                    <span
                      className={
                        stock.trend === "Bullish"
                          ? "trend bullish"
                          : "trend bearish"
                      }
                    >
                      {stock.trend}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        stock.prediction === "UP"
                          ? "prediction up"
                          : "prediction down"
                      }
                    >
                      {stock.prediction}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`recommendation ${stock.recommendation.toLowerCase()}`}
                    >
                      {stock.recommendation}
                    </span>
                  </td>

                  <td>
                    <div className="confidence-wrapper">
                      <div
                        className="confidence-fill"
                        style={{
                          width: `${stock.confidence}%`,
                        }}
                      ></div>

                      <span>{stock.confidence}%</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="empty">
                  No Stocks Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>
    </>
  );
}

export default StockTable;