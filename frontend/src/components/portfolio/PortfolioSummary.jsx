import { useEffect, useState } from "react";
import {
  FaWallet,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaChartPie,
} from "react-icons/fa6";

import { getPortfolio } from "../../api/stockAPI";

import "../../styles/portfolio.css";

function PortfolioSummary() {

  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      const data = await getPortfolio();
      setPortfolio(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!portfolio) {

    return (

      <div className="portfolio-summary">

        Loading Portfolio...

      </div>

    );

  }

  const totalProfit =
    portfolio.current_value - portfolio.invested;

  const percentage =
    (
      (totalProfit / portfolio.invested) *
      100
    ).toFixed(2);

  return (

<section className="portfolio-summary">

<div className="summary-card">

<FaWallet />

<div>

<h4>

Current Value

</h4>

<h2>

₹{portfolio.current_value.toLocaleString()}

</h2>

</div>

</div>

<div className="summary-card">

<FaChartPie />

<div>

<h4>

Invested

</h4>

<h2>

₹{portfolio.invested.toLocaleString()}

</h2>

</div>

</div>

<div className="summary-card">

{

totalProfit>=0

?

<FaArrowTrendUp/>

:

<FaArrowTrendDown/>

}

<div>

<h4>

Overall P/L

</h4>

<h2
className={
totalProfit>=0
?
"positive"
:
"negative"
}
>

₹{totalProfit.toLocaleString()}

</h2>

<p>

{percentage}%

</p>

</div>

</div>

<div className="summary-card">

<FaChartPie/>

<div>

<h4>

Holdings

</h4>

<h2>

{portfolio.total_stocks}

</h2>

</div>

</div>

</section>

  );

}

export default PortfolioSummary;