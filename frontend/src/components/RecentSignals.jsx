function RecentSignals() {

  const signals = [
    "BUY - INFY",
    "SELL - TCS",
    "HOLD - RELIANCE",
    "BUY - HDFCBANK",
    "SELL - WIPRO"
  ];

  return (

    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">

      <h2 className="text-xl font-bold">
        Recent Signals
      </h2>

      <div className="mt-4 space-y-3">

        {signals.map((signal, index) => (

          <div
            key={index}
            className="bg-slate-800 p-3 rounded-lg"
          >
            {signal}
          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentSignals;