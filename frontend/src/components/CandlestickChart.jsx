import React from "react";

function CandlestickChart({ data }) {
  return (
    <div className="bg-slate-800 p-8 rounded-xl text-center">
      <h3 className="text-2xl font-bold text-blue-400">
        Stock Price Chart
      </h3>

      <p className="mt-4 text-slate-300">
        Candlestick chart coming in Week 5
      </p>

      <div className="mt-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-slate-700 py-2"
          >
            <span>
              {item.x.toLocaleDateString()}
            </span>

            <span>
              Open: ₹{item.y[0]} |
              High: ₹{item.y[1]} |
              Low: ₹{item.y[2]} |
              Close: ₹{item.y[3]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandlestickChart;