import { useState } from "react";

function StockFilters({
  search,
  setSearch,
  recommendation,
  setRecommendation,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="stock-filters">

      <input
        type="text"
        placeholder="Search Stock..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
      >
        <option value="">All</option>
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
        <option value="HOLD">HOLD</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="price">Price</option>
        <option value="confidence">Confidence</option>
        <option value="symbol">Symbol</option>
      </select>

    </div>
  );
}

export default StockFilters; 