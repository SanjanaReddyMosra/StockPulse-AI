import { useEffect, useState } from "react";
import { getStocks } from "../../api/stockAPI";
import "../../styles/portfolio.css";

function AddHolding({ onRefresh }) {
  const [stocks, setStocks] = useState([]);

  const [symbol, setSymbol] = useState("");

  const [quantity, setQuantity] = useState("");

  const [buyPrice, setBuyPrice] = useState("");

  useEffect(() => {
    loadStocks();
  }, []);

  async function loadStocks() {
    try {
      const data = await getStocks();
      setStocks(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function saveHolding() {
    if (!symbol || !quantity || !buyPrice) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const portfolio = await fetch(
        "http://127.0.0.1:8000/portfolio"
      ).then((res) => res.json());

      const holdings = portfolio.holdings || [];

      const selected = stocks.find(
        (s) => s.symbol === symbol
      );

      holdings.push({
        symbol,
        quantity: Number(quantity),
        buy_price: Number(buyPrice),
        current_price: selected?.price || Number(buyPrice),
      });

      portfolio.holdings = holdings;
      portfolio.total_stocks = holdings.length;

      portfolio.current_value = holdings.reduce(
        (sum, item) =>
          sum + item.quantity * item.current_price,
        0
      );

      await fetch("http://127.0.0.1:8000/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolio),
      });

      setSymbol("");
      setQuantity("");
      setBuyPrice("");

      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="add-holding">

      <h2>Add Holding</h2>

      <select
        value={symbol}
        onChange={(e) =>
          setSymbol(e.target.value)
        }
      >
        <option value="">Select Stock</option>

        {stocks.map((stock) => (
          <option
            key={stock.symbol}
            value={stock.symbol}
          >
            {stock.symbol}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Buy Price"
        value={buyPrice}
        onChange={(e) =>
          setBuyPrice(e.target.value)
        }
      />

      <button onClick={saveHolding}>
        Add Holding
      </button>

    </div>
  );
}

export default AddHolding;