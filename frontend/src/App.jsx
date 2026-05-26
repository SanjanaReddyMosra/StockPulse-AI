import { useEffect, useState } from "react";
import API from "./api/stockApi";

function App() {

  const [stock, setStock] = useState(null);

  useEffect(() => {

    async function fetchStock() {

      try {

        const response =
          await API.get("/stock/TCS");

        setStock(response.data);

      } catch(error) {

        console.log(error);

      }

    }

    fetchStock();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold">
        StockPulse AI
      </h1>

      <p className="text-slate-400 mt-3">
        Real-Time Indian Stock Analytics
      </p>

      {stock && (

        <div className="mt-10 bg-slate-900 border border-slate-800 p-8 rounded-3xl w-[420px] shadow-2xl">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">
                {stock.symbol}
              </h2>

              <p className="text-slate-400 mt-2">
                NSE
              </p>

            </div>

            <div className={`text-lg font-semibold ${
              stock.percent > 0
              ? "text-green-400"
              : "text-red-400"
            }`}>

              {stock.percent}%

            </div>

          </div>

          <div className="mt-8">

            <h1 className={`text-5xl font-bold ${
              stock.percent > 0
              ? "text-green-400"
              : "text-red-400"
            }`}>

              ₹ {stock.price}

            </h1>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

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

    </div>

  );

}

export default App;