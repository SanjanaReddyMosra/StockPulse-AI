import { useEffect, useState } from "react";
import API from "./api/stockApi";
import MarketGrid from "./components/MarketGrid";
import MarketStatus from "./components/MarketStatus";
import RecentSignals from "./components/RecentSignals";
import CandlestickChart from "./components/CandlestickChart";

function App() {

  const [stock, setStock] = useState(null);
  const [symbol, setSymbol] = useState("TCS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchStock = async (stockSymbol) => {

    setLoading(true);
    setError("");

    try {

      const response =
        await API.get(`/stock/${stockSymbol}`);

      setStock(response.data);

      setLastUpdated(
        new Date().toLocaleTimeString()
      );

    } catch (err) {

      setError("Stock not found");

    }

    setLoading(false);

  };

  const fetchMarketStocks = async () => {

    try {

      const response =
        await API.get("/stocks");

      setStocks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const sampleData = [
  {
    x: new Date("2025-06-01"),
    y: [3900, 4000, 3850, 3980],
  },
  {
    x: new Date("2025-06-02"),
    y: [3980, 4050, 3950, 4020],
  },
  {
    x: new Date("2025-06-03"),
    y: [4020, 4100, 3990, 4080],
  },
  {
    x: new Date("2025-06-04"),
    y: [4080, 4150, 4050, 4120],
  },
];

  useEffect(() => {

    fetchStock("TCS");
    fetchMarketStocks();

    const interval = setInterval(() => {

      fetchStock(symbol);
      fetchMarketStocks();

    }, 60000);

    return () => clearInterval(interval);

  }, [symbol]);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <h1 className="text-5xl font-bold">
        StockPulse AI
      </h1>

      <p className="text-slate-400 mt-3">
        Real-Time Indian Stock Analytics
      </p>

      <p className="text-green-400 mt-2">
        Last Updated: {lastUpdated}
      </p>

      {/* Search Bar */}

      <div className="mt-8 flex gap-3">

        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="bg-slate-900 border border-slate-700 px-4 py-3 rounded-xl w-64 outline-none"
        />

        <button
          onClick={() => fetchStock(symbol)}
          className="bg-blue-600 px-5 py-3 rounded-xl hover:bg-blue-700"
        >
          Search
        </button>

      </div>

      {/* Quick Buttons */}

      <div className="flex gap-3 mt-4 flex-wrap">

        {[
          "TCS",
          "INFY",
          "RELIANCE",
          "SBIN",
          "HDFCBANK"
        ].map((s) => (

          <button
            key={s}
            onClick={() => {

              setSymbol(s);

              fetchStock(s);

            }}
            className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700"
          >
            {s}
          </button>

        ))}

      </div>

      {/* Loading */}

      {loading && (

        <div className="mt-8 text-yellow-400">
          Loading stock data...
        </div>

      )}

      {/* Error */}

      {error && (

        <div className="mt-8 text-red-400">
          {error}
        </div>

      )}

      {/* Selected Stock Card */}

      {stock && !loading && (

        <div className="mt-10 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl hover:shadow-blue-900/30 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">
                {stock.symbol}
              </h2>

              <p className="text-slate-400 mt-2">
                NSE
              </p>

            </div>

            <div
              className={`text-lg font-semibold ${
                stock.percent > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {stock.percent}%
            </div>

          </div>

          <div className="mt-8">

            <h1
              className={`text-5xl font-bold ${
                stock.percent > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              ₹ {stock.price}
            </h1>

          </div>

          {/* Price Information */}

          <div className="grid md:grid-cols-4 gap-4 mt-8">

            <div className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300">
              <p className="text-slate-400">
                Open
              </p>

              <h3 className="text-xl mt-2">
                ₹ {stock.open}
              </h3>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300">
              <p className="text-slate-400">
                High
              </p>

              <h3 className="text-xl mt-2">
                ₹ {stock.high}
              </h3>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300">
              <p className="text-slate-400">
                Low
              </p>

              <h3 className="text-xl mt-2">
                ₹ {stock.low}
              </h3>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">
                Volume
              </p>

              <h3 className="text-xl mt-2">
                {stock.volume}
              </h3>
            </div>

          </div>

          {/* Technical Indicators */}

          <div className="grid md:grid-cols-4 gap-4 mt-8">

            <div className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300">

              <p className="text-slate-400">
                RSI
              </p>

              <h3 className="text-xl mt-2">
                {stock.rsi}
              </h3>

            </div>

            <div className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300">

              <p className="text-slate-400">
                SMA20
              </p>

              <h3 className="text-xl mt-2">
                ₹ {stock.sma20}
              </h3>

            </div>

            <div className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300">

              <p className="text-slate-400">
                SMA50
              </p>

              <h3 className="text-xl mt-2">
                ₹ {stock.sma50}
              </h3>

            </div>

            <div className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300">

              <p className="text-slate-400">
                Trend
              </p>

              <h3
                className={`text-xl mt-2 font-bold ${
                  stock.trend === "Bullish"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {stock.trend}
              </h3>

            </div>

          </div>
          {/* Signal Engine */}

<div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300">

  <h2 className="text-2xl font-bold mb-4">
    Trading Signal
  </h2>

  <h3
    className={`text-4xl font-bold ${
      stock.signal === "BUY"
        ? "text-green-400"
        : stock.signal === "SELL"
        ? "text-red-400"
        : "text-yellow-400"
    }`}
  >
    {stock.signal === "BUY" && "🟢 BUY"}

  {stock.signal === "SELL" && "🔴 SELL"}

  {stock.signal === "HOLD" && "🟡 HOLD"}
  </h3>

  <div className="mt-4">

  <p className="mb-2">
    Confidence:
    <span className="text-blue-400 ml-2">
      {stock.confidence}%
    </span>
  </p>

  <div className="w-full bg-slate-700 rounded-full h-3">

    <div
      className="bg-blue-500 h-3 rounded-full"
      style={{
        width: `${stock.confidence}%`
      }}
    />

  </div>

</div>

  <p className="mt-4 text-slate-300">
    {stock.reason}
  </p>

</div>

        </div>

      )}

      {/* Candlestick Chart */}

<div className="mt-10">
  <h2 className="text-3xl font-bold mb-6">
    Price Chart
  </h2>

  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
    <CandlestickChart data={sampleData} />
  </div>
</div>

      {/* Market Overview */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Market Overview
        </h2>

        <MarketGrid
          stocks={stocks}
          onSelectStock={(selected) => {

            setSymbol(selected);

            fetchStock(selected);

          }}
        />

      </div>

      {/* Bottom Widgets */}

      <div className="grid lg:grid-cols-2 gap-6 mt-10">

        <MarketStatus />

        <RecentSignals />

      </div>

    </div>

  );

}

export default App;