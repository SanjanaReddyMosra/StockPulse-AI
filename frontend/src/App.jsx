import { useEffect, useState } from "react";
import API from "./api/stockApi";
import MarketGrid from "./components/MarketGrid";
import MarketStatus from "./components/MarketStatus";
import RecentSignals from "./components/RecentSignals";

function App() {

  const [stock, setStock] = useState(null);
  const [symbol, setSymbol] = useState("TCS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);

  const fetchStock = async (stockSymbol) => {

    setLoading(true);
    setError("");

    try {

      const response =
        await API.get(`/stock/${stockSymbol}`);

      setStock(response.data);

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

  useEffect(() => {

    fetchStock("TCS");
    fetchMarketStocks();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold">
        StockPulse AI
      </h1>

      <p className="text-slate-400 mt-3">
        Real-Time Indian Stock Analytics
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

        {["TCS", "INFY", "RELIANCE", "SBIN", "HDFCBANK"].map((s) => (

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

        <div className="mt-10 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">

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

          <div className="grid md:grid-cols-4 gap-4 mt-8">

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">
                Open
              </p>
              <h3 className="text-xl mt-2">
                ₹ {stock.open}
              </h3>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">
                High
              </p>
              <h3 className="text-xl mt-2">
                ₹ {stock.high}
              </h3>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
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

        </div>

      )}

      {/* Market Overview */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Market Overview
        </h2>

        <MarketGrid stocks={stocks} />

      </div>

      {/* Bottom Widgets */}

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <MarketStatus />

        <RecentSignals />

      </div>

    </div>

  );

}

export default App;