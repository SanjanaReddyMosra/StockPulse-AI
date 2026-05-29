function MarketGrid({ stocks }) {

  return (

    <div className="grid md:grid-cols-4 gap-4">

      {stocks.map((stock) => (

        <div
          key={stock.symbol}
          className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-blue-500 transition"
        >

          <h3 className="font-bold text-lg">
            {stock.symbol}
          </h3>

          <p className="text-2xl mt-2">
            ₹ {stock.price}
          </p>

          <p
            className={
              stock.percent > 0
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {stock.percent}%
          </p>

        </div>

      ))}

    </div>

  );

}

export default MarketGrid;