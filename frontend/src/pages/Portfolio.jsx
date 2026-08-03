import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import AddHolding from "../components/portfolio/AddHolding";
import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import HoldingsTable from "../components/portfolio/HoldingsTable";
import PortfolioAllocation from "../components/portfolio/PortfolioAllocation";
import "../styles/layout.css";
import "../styles/portfolio.css";

function Portfolio() {

  return (

<>

<Navbar/>

<div className="dashboard-layout">

<Sidebar/>

<main className="dashboard-content">

<h1 className="page-title">

Portfolio

</h1>

<PortfolioSummary/>
<AddHolding/>
<HoldingsTable/>
<PortfolioAllocation/>

</main>

</div>

<Footer/>

</>

  );

}

export default Portfolio;