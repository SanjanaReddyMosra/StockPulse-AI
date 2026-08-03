import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getPortfolio } from "../../api/stockAPI";
import "../../styles/portfolio.css";

function PortfolioAllocation() {

  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {

    try {

      const portfolio =
        await getPortfolio();

      const holdings =
        portfolio.holdings || [];

      const chartData =
        holdings.map(
          stock =>
            stock.quantity *
            stock.current_price
        );

      const chartLabels =
        holdings.map(
          stock =>
            stock.symbol
        );

      setSeries(chartData);
      setLabels(chartLabels);

    }

    catch(err){

      console.error(err);

    }

  }

  const options = {

    labels,

    legend:{
      position:"bottom",
      labels:{
        colors:"#ffffff"
      }
    },

    chart:{
      background:"transparent"
    },

    theme:{
      mode:"dark"
    }

  };

  return(

<div className="allocation-card">

<h2>

Portfolio Allocation

</h2>

<Chart

type="donut"

height={340}

series={series}

options={options}

/>

</div>

  );

}

export default PortfolioAllocation;