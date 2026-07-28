import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

import MarketOverview from "../components/dashboard/MarketOverview";
import Portfolio from "../components/dashboard/PortfolioCard";
import Watchlist from "../components/dashboard/WatchlistCard";
import News from "../components/dashboard/NewsCard";
import Charts from "../components/dashboard/Charts";

import "../styles/layout.css";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          <MarketOverview />

          <div className="dashboard-grid">
            <Portfolio />

            <Watchlist />

            <News />

            <Charts />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
