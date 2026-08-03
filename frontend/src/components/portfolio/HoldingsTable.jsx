import { useEffect, useState } from "react";
import { getPortfolio } from "../../api/stockAPI";
import "../../styles/portfolio.css";

function HoldingsTable() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    loadHoldings();
  }, []);

  async function loadHoldings() {
    try {
      const data = await getPortfolio();

      // Expect backend to return holdings array
      setHoldings(data.holdings || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="holdings-card">

      <div className="holdings-header">

        <h2>Your Holdings</h2>

        <span>
          {holdings.length} Stocks
        </span>

      </div>

      <table className="holdings-table">

        <thead>

          <tr>

            <th>Symbol</th>

            <th>Qty</th>

            <th>Buy Price</th>

            <th>Current</th>

            <th>Value</th>

            <th>P/L</th>

          </tr>

        </thead>

        <tbody>

          {holdings.length > 0 ? (

            holdings.map((stock) => {

              const value =
                stock.quantity *
                stock.current_price;

              const profit =
                value -
                stock.quantity *
                stock.buy_price;

              return (

                <tr key={stock.symbol}>

                  <td>

                    <strong>

                      {stock.symbol}

                    </strong>

                  </td>

                  <td>

                    {stock.quantity}

                  </td>

                  <td>

                    ₹{stock.buy_price}

                  </td>

                  <td>

                    ₹{stock.current_price}

                  </td>

                  <td>

                    ₹{value.toLocaleString()}

                  </td>

                  <td
                    className={
                      profit >= 0
                        ? "positive"
                        : "negative"
                    }
                  >

                    ₹{profit.toFixed(2)}

                  </td>

                </tr>

              );

            })

          ) : (

            <tr>

              <td
                colSpan="6"
                className="empty-state"
              >

                No Holdings Available

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default HoldingsTable;