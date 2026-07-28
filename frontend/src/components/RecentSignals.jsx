import { useState } from "react";

function RecentSignals() {

  const [showAll, setShowAll] =
    useState(false);

  const signals = [
    "BUY - INFY",
    "SELL - TCS",
    "HOLD - RELIANCE",
    "BUY - HDFCBANK",
    "SELL - WIPRO",
    "BUY - LT",
    "SELL - ITC",
    "BUY - SBIN"
  ];

  const visibleSignals =
    showAll
      ? signals
      : signals.slice(0, 4);

  return (

    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">

      <h2 className="text-xl font-bold">
        Recent Signals
      </h2>

      <div className="mt-4 space-y-3">

        {visibleSignals.map(
          (signal, index) => (

            <div
              key={index}
              className="bg-slate-800 p-3 rounded-lg"
            >
              {signal}
            </div>

          )
        )}

      </div>

      <button
        onClick={() =>
          setShowAll(!showAll)
        }
        className="
          mt-4
          text-blue-400
          hover:text-blue-300
        "
      >
        {showAll
          ? "Show Less"
          : "Show More"}
      </button>

    </div>

  );

}

export default RecentSignals;
