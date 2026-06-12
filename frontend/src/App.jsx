import { useEffect, useState } from "react";
import API from "./api/stockApi";
import MarketGrid from "./components/MarketGrid";
import MarketStatus from "./components/MarketStatus";
import RecentSignals from "./components/RecentSignals";
import CandlestickChart from "./components/CandlestickChart";

const calculateSignal = (stock) => {
  let score = 0;
  let reasons = [];

  // RSI
  if (stock.rsi < 30) {
    score += 35;
    reasons.push("RSI Oversold");
  } else if (stock.rsi > 70) {
    score -= 35;
    reasons.push("RSI Overbought");
  }

  // SMA Strength
  const smaGap =
    ((stock.sma20 - stock.sma50) / stock.sma50) * 100;

  if (smaGap > 2) {
    score += 25;
    reasons.push("Strong Bullish SMA");
  } else if (smaGap < -2) {
    score -= 25;
    reasons.push("Strong Bearish SMA");
  }

  // Trend
  if (stock.trend === "Bullish") {
    score += 20;
    reasons.push("Bullish Trend");
  } else {
    score -= 20;
    reasons.push("Bearish Trend");
  }

  // Daily Momentum
if (stock.percent > 1) {
  score += 20;
  reasons.push("Positive Momentum");
}
else if (stock.percent < -1) {
  score -= 20;
  reasons.push("Negative Momentum");
}

  // Volume
  if (stock.volume > 1000000) {
    score += 10;
    reasons.push("High Volume");
  }

  let signal = "HOLD";

  if (score >= 25) {
    signal = "BUY";
  } else if (score <= -25) {
    signal = "SELL";
  }

  return {
    signal,
    confidence: Math.min(Math.abs(score), 100),
    reasons,
  };
};

const calculateRisk = (stock) => {

  let riskScore = 0;

  // RSI extremes
  if (stock.rsi > 70 || stock.rsi < 30) {
    riskScore += 40;
  }

  // Trend
  if (stock.trend === "Bearish") {
    riskScore += 30;
  }

  // Large daily move
  if (Math.abs(stock.percent) > 2) {
    riskScore += 20;
  }

  // Volume spike
  if (stock.volume > 2000000) {
    riskScore += 10;
  }

  let risk = "Low";

  if (riskScore >= 60) {
    risk = "High";
  }
  else if (riskScore >= 30) {
    risk = "Medium";
  }

  return {
    risk,
    riskScore
  };
};

const generateInsight = (
  stock,
  signalResult,
  riskResult
) => {

  let insight = "";

  // Trend
  if (stock.trend === "Bullish") {
    insight +=
      "The stock is currently in a bullish trend. ";
  } else {
    insight +=
      "The stock is currently in a bearish trend. ";
  }

  // RSI
  if (stock.rsi < 30) {
    insight +=
      "RSI indicates oversold conditions and a potential rebound. ";
  }
  else if (stock.rsi > 70) {
    insight +=
      "RSI indicates overbought conditions and possible profit booking. ";
  }
  else {
    insight +=
      "RSI remains neutral without strong reversal signals. ";
  }

  // Signal
  if (signalResult.signal === "BUY") {
    insight +=
      "Technical indicators currently favor a buying opportunity. ";
  }
  else if (
    signalResult.signal === "SELL"
  ) {
    insight +=
      "Technical indicators currently suggest downside risk. ";
  }
  else {
    insight +=
      "The stock is trading in a neutral zone. ";
  }

  // Risk
  insight +=
    `Overall risk is ${riskResult.risk.toLowerCase()}. `;

  return insight;

};

function App() {

  const [stock, setStock] = useState(null);
  const [symbol, setSymbol] = useState("TCS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [recommendation, setRecommendation] =
  useState(null);
const [chartData, setChartData] =
  useState([]);
const [sentiment, setSentiment] =
  useState(null);
  const [portfolio, setPortfolio] = useState([]);

const [portfolioSymbol, setPortfolioSymbol] =
  useState("");

const [quantity, setQuantity] =
  useState("");

const [buyPrice, setBuyPrice] =
  useState("");
  const fetchHistory = async (
  stockSymbol
) => {
  try {
    const response =
      await API.get(
        `/history/${stockSymbol}`
      );

    const formatted =
      response.data.history.map(
        (item) => ({
          x: new Date(item.date),
          y: [
            item.open,
            item.high,
            item.low,
            item.close,
          ],
        })
      );

    setChartData(formatted);

  } catch (error) {
    console.log(error);
  }
};

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

  const fetchNews = async (stockSymbol) => {

  try {

    const response =
      await API.get(`/news/${stockSymbol}`);

    setNews(response.data);

  }
  catch (error) {

    console.log(error);

  }

};
const fetchRecommendation = async (
  stockSymbol
) => {

  try {

    const response =
      await API.get(
        `/recommendation/${stockSymbol}`
      );

    setRecommendation(
      response.data
    );

  }
  catch (error) {

    console.log(error);

  }

};
const fetchSentiment = async (
  stockSymbol
) => {

  try {

    const response =
      await API.get(
        `/sentiment/${stockSymbol}`
      );

    setSentiment(
      response.data
    );

  }
  catch (error) {

    console.log(error);

  }

};

const addToPortfolio = () => {

  if (
    !portfolioSymbol ||
    !quantity ||
    !buyPrice
  )
    return;

  const newItem = {
    symbol: portfolioSymbol.toUpperCase(),
    quantity: Number(quantity),
    buyPrice: Number(buyPrice),
  };

  const updatedPortfolio = [
    ...portfolio,
    newItem,
  ];

  setPortfolio(updatedPortfolio);

  localStorage.setItem(
    "portfolio",
    JSON.stringify(updatedPortfolio)
  );

  setPortfolioSymbol("");
  setQuantity("");
  setBuyPrice("");

};

  
const removeStock = (index) => {

  const updatedPortfolio =
    portfolio.filter(
      (_, i) => i !== index
    );

  setPortfolio(
    updatedPortfolio
  );

  localStorage.setItem(
    "portfolio",
    JSON.stringify(
      updatedPortfolio
    )
  );

};

  useEffect(() => {
    const savedPortfolio =
  localStorage.getItem("portfolio");

if (savedPortfolio) {
  setPortfolio(
    JSON.parse(savedPortfolio)
  );
}
    fetchStock("TCS");
    fetchNews("TCS");
    fetchRecommendation("TCS");
    fetchSentiment("TCS");
    fetchHistory("TCS");
    fetchMarketStocks();

    const interval = setInterval(() => {

      fetchStock(symbol);
      fetchNews(symbol);
      fetchRecommendation(symbol);
      fetchSentiment(symbol);
      fetchHistory(symbol);
      fetchMarketStocks();

    }, 60000);

    return () => clearInterval(interval);

  }, [symbol]);

  const signalResult =
  stock ? calculateSignal(stock) : null;

  const riskResult =
  stock ? calculateRisk(stock) : null;

  const aiInsight =
  stock &&
  signalResult &&
  riskResult
    ? generateInsight(
        stock,
        signalResult,
        riskResult
      )
    : "";
  
  const fearGreedValue =
  sentiment?.average_sentiment || 0;

let marketMood = "Neutral";

if (fearGreedValue > 0.3)
  marketMood = "Greed";

if (fearGreedValue < -0.3)
  marketMood = "Fear";

  const totalInvestment = portfolio.reduce(
  (sum, item) =>
    sum + item.buyPrice * item.quantity,
  0
);

const totalCurrentValue = portfolio.reduce(
  (sum, item) =>
    sum +
    (stock?.price || 0) *
      item.quantity,
  0
);

const totalProfit =
  totalCurrentValue -
  totalInvestment;

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <h1 className="text-5xl font-bold">
        StockPulse AI
      </h1>

      <p className="text-slate-400 mt-3">
        Predict • Analyze • Invest Smarter
      </p>

      <p className="text-green-400 mt-2">
        Last Updated: {lastUpdated}
      </p>

      <div className="grid md:grid-cols-4 gap-4 mt-6">

  <div className="bg-slate-900 p-4 rounded-xl">
    <h3 className="text-2xl font-bold">20+</h3>
    <p className="text-slate-400">
      NSE Stocks
    </p>
  </div>

  <div className="bg-slate-900 p-4 rounded-xl">
    <h3 className="text-2xl font-bold">
      AI
    </h3>
    <p className="text-slate-400">
      Predictions
    </p>
  </div>

  <div className="bg-slate-900 p-4 rounded-xl">
    <h3 className="text-2xl font-bold">
      Live
    </h3>
    <p className="text-slate-400">
      News Analysis
    </p>
  </div>

  <div className="bg-slate-900 p-4 rounded-xl">
    <h3 className="text-2xl font-bold">
      Portfolio
    </h3>
    <p className="text-slate-400">
      Tracking
    </p>
  </div>

</div>

      <div className="grid md:grid-cols-5 gap-4 mt-8">

  <div className="bg-slate-900 p-4 rounded-xl">
    <p className="text-slate-400">
      Selected Stock
    </p>

    <h3 className="text-2xl font-bold">
      {stock?.symbol}
    </h3>
  </div>

  <div className="bg-slate-900 p-4 rounded-xl">
    <p className="text-slate-400">
      Signal
    </p>

    <h3 className="text-2xl font-bold">
      {signalResult?.signal}
    </h3>
  </div>

  <div className="bg-slate-900 p-4 rounded-xl">
    <p className="text-slate-400">
      Risk
    </p>

    <h3 className="text-2xl font-bold">
      {riskResult?.risk}
    </h3>
  </div>

  <div className="bg-slate-900 p-4 rounded-xl">
    <p className="text-slate-400">
      Recommendation
    </p>

    <h3 className="text-2xl font-bold">
      {recommendation?.recommendation}
    </h3>
  </div>
  <div className="bg-slate-900 p-4 rounded-xl">
  <p className="text-slate-400">
    Sentiment
  </p>

  <h3 className="text-2xl font-bold">
    {sentiment?.label}
  </h3>
</div>

</div>

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
          onClick={() => {
            fetchStock(symbol);
            fetchNews(symbol);
            fetchRecommendation(symbol);
            fetchSentiment(symbol);
            fetchHistory(symbol);
          }}
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
              fetchNews(s);
              fetchRecommendation(s);
              fetchSentiment(s);
              fetchHistory(s);
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
          <div className="mt-8 bg-slate-900 p-6 rounded-2xl">

  <h2 className="text-2xl font-bold mb-4">
    AI Insights
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    <div>
      <p className="text-slate-400">
        Recommendation
      </p>

      <h3 className="text-xl font-bold">
        {signalResult?.signal}
      </h3>
    </div>

    <div>
      <p className="text-slate-400">
        Confidence
      </p>

      <h3 className="text-xl font-bold">
        {signalResult?.confidence}%
      </h3>
    </div>

    <div>
      <p className="text-slate-400">
        Risk
      </p>

      <h3 className="text-xl font-bold">
        {riskResult?.risk}
      </h3>
    </div>

  </div>

  <p className="mt-6 text-slate-300">
    {aiInsight}
  </p>

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
            <div className="bg-slate-800 p-4 rounded-xl">

  <p className="text-slate-400">
    Daily Return
  </p>

  <h3
    className={`text-xl mt-2 ${
      stock.daily_return > 0
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {stock.daily_return}%
  </h3>

</div>
          </div>
          {/* AI Signal Engine */}

<div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">

  <h2 className="text-2xl font-bold mb-4">
    AI Trading Signal
  </h2>

  <h3
    className={`text-4xl font-bold ${
      signalResult.signal === "BUY"
        ? "text-green-400"
        : signalResult.signal === "SELL"
        ? "text-red-400"
        : "text-yellow-400"
    }`}
  >
    {signalResult.signal}
  </h3>

  <p className="mt-3">
    Confidence:
    <span className="text-blue-400 ml-2">
      {signalResult.confidence}%
    </span>
  </p>

  <div className="w-full bg-slate-700 rounded-full h-3 mt-2">

    <div
      className="bg-blue-500 h-3 rounded-full"
      style={{
        width: `${signalResult.confidence}%`
      }}
    />

  </div>

  <div className="mt-5">

    <h4 className="font-semibold mb-2">
      Reasons
    </h4>

    <ul className="space-y-2">

      {signalResult.reasons.map(
        (reason, index) => (

          <li
            key={index}
            className="text-slate-300"
          >
            ✓ {reason}
          </li>

        )
      )}

    </ul>

  </div>

</div>
</div>
)}

{sentiment && (

<div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">

  <h2 className="text-2xl font-bold mb-4">
    Market Sentiment
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <div>

      <p className="text-slate-400">
        Score
      </p>

      <h3 className="text-3xl font-bold">
        {sentiment.score}
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Label
      </p>

      <h3
        className={`text-3xl font-bold ${
          sentiment.label === "Positive"
            ? "text-green-400"
            : sentiment.label === "Negative"
            ? "text-red-400"
            : "text-yellow-400"
        }`}
      >
        {sentiment.label}
      </h3>

    </div>

  </div>

</div>


)}
<div className="bg-slate-900 p-6 rounded-2xl mt-6">

  <h2 className="text-xl font-bold">
    Market Mood
  </h2>

  <p
  className={`mt-3 text-3xl font-bold ${
    marketMood === "Greed"
      ? "text-green-400"
      : marketMood === "Fear"
      ? "text-red-400"
      : "text-yellow-400"
  }`}
>
  {marketMood}
</p>

</div>

{recommendation && (

<div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">

  <h2 className="text-2xl font-bold mb-4">
    AI Prediction Engine
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    <div>

      <p className="text-slate-400">
        Prediction
      </p>

      <h3 className="text-3xl font-bold text-blue-400">
        {recommendation.prediction}
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Confidence
      </p>

      <h3 className="text-3xl font-bold text-purple-400">
        {recommendation.confidence}%
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Recommendation
      </p>

      <h3
        className={`text-3xl font-bold ${
  recommendation.recommendation === "STRONG BUY"
    ? "text-green-300"
    : recommendation.recommendation === "BUY"
    ? "text-green-500"
    : recommendation.recommendation === "SELL"
    ? "text-red-500"
    : recommendation.recommendation === "STRONG SELL"
    ? "text-red-300"
    : "text-yellow-400"
}`}
      >
        {recommendation.recommendation}
      </h3>

    </div>

  </div>

</div>

)}

{riskResult && (
<div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">

  <h2 className="text-2xl font-bold mb-4">
    Risk Analysis
  </h2>

  <h3
    className={`text-3xl font-bold ${
      riskResult?.risk === "Low"
        ? "text-green-400"
        : riskResult?.risk === "Medium"
        ? "text-yellow-400"
        : "text-red-400"
    }`}
  >
    {riskResult?.risk} Risk
  </h3>

  <p className="mt-3">
    Risk Score:
    <span className="ml-2 text-blue-400">
      {riskResult?.riskScore}/100
    </span>
  </p>

  <div className="w-full bg-slate-700 rounded-full h-3 mt-3">

    <div
      className={`h-3 rounded-full ${
        riskResult?.risk === "Low"
          ? "bg-green-500"
          : riskResult?.risk === "Medium"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{
        width: `${riskResult?.riskScore || 0}%`
      }}
    />

  </div>

</div>
)}


      {/* Candlestick Chart */}

<div className="mt-10">
  <h2 className="text-3xl font-bold mb-6">
    Price Chart
  </h2>

  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
    <CandlestickChart data={chartData} />
  </div>
</div>

      <div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Latest News
  </h2>

  <div className="grid gap-4">

    {news.map((item, index) => (

      <div
        key={index}
        className="bg-slate-900 p-5 rounded-xl border border-slate-800"
      >

        <h3 className="font-semibold">
          {item.title}
        </h3>

        <p className="text-slate-400 mt-2">
          {item.source}
        </p>

        <a
  href={item.url}
  target="_blank"
  rel="noreferrer"
  className="text-blue-400 text-sm block mt-2"
>
  Read Article →
</a>

        <span
          className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
            item.sentiment === "Positive"
              ? "bg-green-500/20 text-green-400"
              : item.sentiment === "Negative"
              ? "bg-red-500/20 text-red-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {item.sentiment}
        </span>
        <div className="mt-2 text-sm text-slate-400">
  Sentiment Score: {item.score}
</div>

      </div>

    ))}

  </div>

      </div>

      <div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Portfolio Tracker
  </h2>
  <p className="text-yellow-400 mb-4">
⚠ Current valuation uses the selected stock price.
Multi-stock live valuation will be added next.
</p>
  <div className="bg-slate-900 p-6 rounded-2xl">

    <div className="grid md:grid-cols-4 gap-4">

      <input
        type="text"
        placeholder="Stock"
        value={portfolioSymbol}
        onChange={(e) =>
          setPortfolioSymbol(e.target.value)
        }
        className="bg-slate-800 p-3 rounded-xl"
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(e.target.value)
        }
        className="bg-slate-800 p-3 rounded-xl"
      />

      <input
        type="number"
        placeholder="Buy Price"
        value={buyPrice}
        onChange={(e) =>
          setBuyPrice(e.target.value)
        }
        className="bg-slate-800 p-3 rounded-xl"
      />

      <button
        onClick={addToPortfolio}
        className="bg-green-600 rounded-xl"
      >
        Add Stock
      </button>

    </div>

  </div>

</div>

<div className="mt-6 bg-slate-900 p-6 rounded-2xl">

  <table className="w-full">

    <thead>

      <tr className="text-left">

        <th>Stock</th>
        <th>Qty</th>
        <th>Buy Price</th>
        <th>Current</th>
        <th>Risk</th>
        <th>P/L</th>
        <th>Action</th>

      </tr>

    </thead>

    <tbody>

      {portfolio.map((item, index) => (

        <tr
          key={index}
          className="border-t border-slate-700"
        >

          <td className="py-3">
  {item.symbol}
</td>

<td>
  {item.quantity}
</td>

<td>
  ₹{item.buyPrice}
</td>

<td>
  ₹{stock?.price}
</td>

<td>
  <span
    className={`px-2 py-1 rounded text-sm ${
      riskResult?.risk === "Low"
        ? "bg-green-500/20 text-green-400"
        : riskResult?.risk === "Medium"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {riskResult?.risk}
  </span>
</td>

<td
  className={
    stock?.price > item.buyPrice
      ? "text-green-400"
      : "text-red-400"
  }
>
  ₹
  {
    (
  ((stock?.price || 0) -
    item.buyPrice) *
  item.quantity
).toFixed(2)}
</td>

<td>
  <button
    onClick={() =>
      removeStock(index)
    }
    className="bg-red-600 px-3 py-1 rounded"
  >
    Remove
  </button>
</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

<div className="mt-6 bg-slate-900 p-6 rounded-2xl">

  <div className="grid md:grid-cols-3 gap-4">

  <div className="bg-slate-800 p-4 rounded-xl">

    <p className="text-slate-400">
      Investment
    </p>

    <h3 className="text-2xl font-bold">
      ₹{totalInvestment.toFixed(2)}
    </h3>

  </div>

  <div className="bg-slate-800 p-4 rounded-xl">

    <p className="text-slate-400">
      Current Value
    </p>

    <h3 className="text-2xl font-bold">
      ₹{totalCurrentValue.toFixed(2)}
    </h3>

  </div>

  <div className="bg-slate-800 p-4 rounded-xl">

    <p className="text-slate-400">
      Profit / Loss
    </p>

    <h3
      className={`text-2xl font-bold ${
        totalProfit >= 0
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      ₹{totalProfit.toFixed(2)}
    </h3>

  </div>

</div>

</div>
      
      <div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Top Movers
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-slate-900 p-6 rounded-2xl">

      <h3 className="text-green-400 text-2xl mb-4">
        Top Gainers
      </h3>

      {stocks
        .filter(stock => stock.percent > 0)
        .sort((a,b) => b.percent - a.percent)
        .slice(0,5)
        .map(stock => (

          <div
            key={stock.symbol}
            className="flex justify-between py-2"
          >
            <span>{stock.symbol}</span>

            <span className="text-green-400">
              +{stock.percent}%
            </span>

          </div>

      ))}

    </div>

    <div className="bg-slate-900 p-6 rounded-2xl">

      <h3 className="text-red-400 text-2xl mb-4">
        Top Losers
      </h3>

      {stocks
        .filter(stock => stock.percent < 0)
        .sort((a,b) => a.percent - b.percent)
        .slice(0,5)
        .map(stock => (

          <div
            key={stock.symbol}
            className="flex justify-between py-2"
          >
            <span>{stock.symbol}</span>

            <span className="text-red-400">
              {stock.percent}%
            </span>

          </div>

      ))}

    </div>

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
            fetchNews(selected);
            fetchRecommendation(selected);
            fetchSentiment(selected);
            fetchHistory(selected);

          }}
        />

      </div>

      {/* Bottom Widgets */}

      <div className="grid lg:grid-cols-2 gap-6 mt-10">

        <MarketStatus />

        <RecentSignals />

      </div>
            <footer className="mt-20 text-center text-slate-500">

        Built with React + FastAPI + Machine Learning

      </footer>

    </div>

  );

}

export default App;
