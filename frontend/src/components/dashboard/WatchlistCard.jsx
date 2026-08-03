import { useEffect, useState } from "react";
import {
  FaBookmark,
  FaTrash,
} from "react-icons/fa";

import { getStock } from "../../api/stockAPI";

function WatchlistCard() {

  const [watchlist, setWatchlist] =
    useState([]);

  useEffect(() => {

    loadWatchlist();

    window.addEventListener(
      "stockChanged",
      loadWatchlist
    );

    return () =>
      window.removeEventListener(
        "stockChanged",
        loadWatchlist
      );

  }, []);

  async function loadWatchlist() {

    const saved =
      JSON.parse(
        localStorage.getItem("watchlist")
      ) || [
        "TCS",
        "RELIANCE",
        "INFY",
        "HDFCBANK",
      ];

    const data = await Promise.all(

      saved.map(async (symbol) => {

        try{

          return await getStock(symbol);

        }

        catch{

          return null;

        }

      })

    );

    setWatchlist(
      data.filter(Boolean)
    );

  }

  function removeStock(symbol){

    const updated =
      watchlist
        .filter(
          s=>s.symbol!==symbol
        )
        .map(
          s=>s.symbol
        );

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updated)
    );

    loadWatchlist();

  }

  function selectStock(symbol){

    localStorage.setItem(
      "selectedStock",
      symbol
    );

    window.dispatchEvent(
      new Event("stockChanged")
    );

  }

  return(

<div className="dashboard-card">

<h2>

<FaBookmark/>

Watchlist

</h2>

<div className="watchlist-items">

{

watchlist.map(stock=>(

<div

key={stock.symbol}

className="watch-item"

>

<div
className="watch-info"

onClick={()=>selectStock(stock.symbol)}

>

<strong>

{stock.symbol}

</strong>

<span>

₹{stock.price}

</span>

</div>

<div
className={
stock.percent>=0
?
"positive"
:
"negative"
}
>

{stock.percent>0?"+":""}

{stock.percent.toFixed(2)}%

</div>

<FaTrash

className="remove-icon"

onClick={()=>removeStock(stock.symbol)}

/>

</div>

))

}

</div>

</div>

  );

}

export default WatchlistCard;