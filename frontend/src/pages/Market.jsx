import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

import StockFilters from "../components/filters/StockFilters";
import StockTable from "../components/tables/StockTable";
import MarketStats from "../components/market/MarketStats";
import "../styles/market.css";

function Market() {
  const [search, setSearch] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [sortBy, setSortBy] = useState("");
const [stocks, setStocks] = useState([]);
  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">

          <h1>Market</h1>
          <p>Explore all available stocks with AI insights.</p>
          <MarketStats stocks={stocks} />
          <StockFilters
            search={search}
            setSearch={setSearch}
            recommendation={recommendation}
            setRecommendation={setRecommendation}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <StockTable
            search={search}
            recommendation={recommendation}
            sortBy={sortBy}
            onStocksLoaded={setStocks}
          />

        </main>
      </div>

      <Footer />
    </>
  );
}

export default Market;