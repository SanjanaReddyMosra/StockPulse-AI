function MarketStatus() {

  const now = new Date();

  const hour = now.getHours();

  const isOpen =
    hour >= 9 &&
    hour < 16;

  return (

    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">

      <h2 className="text-xl font-bold">
        Market Status
      </h2>

      <p
        className={`mt-4 text-lg ${
          isOpen
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {isOpen
          ? "Market Open"
          : "Market Closed"}
      </p>

    </div>

  );

}

export default MarketStatus;
